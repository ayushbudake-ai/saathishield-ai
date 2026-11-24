import os
import csv
import re
import math
from collections import Counter
from typing import List, Dict, Any, Tuple

def tokenize(text: str) -> List[str]:
    """Tokenizes text into words and 2-grams across Latin and Devanagari scripts."""
    if not text:
        return []
    # Extract alphanumeric and Devanagari Unicode sequences
    words = [w.lower() for w in re.findall(r'[\w\u0900-\u097F]+', text)]
    # Filter very short tokens
    unigrams = [w for w in words if len(w) > 1]
    # Add bigrams for compound phrases
    bigrams = [f"{words[i]}_{words[i+1]}" for i in range(len(words)-1) if len(words[i]) > 1 and len(words[i+1]) > 1]
    return unigrams + bigrams

class KnowledgeRetriever:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = data_dir
        self.knowledge_items: List[Dict[str, Any]] = []
        self.sources: Dict[str, Dict[str, str]] = {}
        self.doc_freq: Counter = Counter()
        self.total_docs: int = 0
        self.load_sources()
        self.load_datasets()
        self.compute_idf()

    def load_sources(self):
        src_path = os.path.join(self.data_dir, "source_register.csv")
        if os.path.exists(src_path):
            with open(src_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for r in reader:
                    self.sources[r.get("source_id", "")] = {
                        "name": f"{r.get('organization', '')} - {r.get('title_description', '')}",
                        "url": r.get("url", ""),
                        "authority": r.get("organization", ""),
                        "claims": r.get("key_guidelines_claims", "")
                    }

    def load_datasets(self):
        orig_path = os.path.join(self.data_dir, "original", "saathishield_original.csv")
        enh_path = os.path.join(self.data_dir, "adaption", "saathishield_enhanced.csv")
        meta_path = os.path.join(self.data_dir, "metadata", "saathishield_metadata.csv")

        metadata_list = []
        if os.path.exists(meta_path):
            with open(meta_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                metadata_list = list(reader)

        orig_rows = []
        if os.path.exists(orig_path):
            with open(orig_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                orig_rows = list(reader)

        enh_rows = []
        if os.path.exists(enh_path):
            with open(enh_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                enh_rows = list(reader)

        total = max(len(orig_rows), len(enh_rows))
        for i in range(total):
            meta = metadata_list[i] if i < len(metadata_list) else {}
            orig_p = orig_rows[i]["prompt"] if i < len(orig_rows) else ""
            orig_c = orig_rows[i]["completion"] if i < len(orig_rows) else ""
            
            enh_p = enh_rows[i].get("enhanced_prompt", orig_p) if i < len(enh_rows) else orig_p
            enh_c = enh_rows[i].get("enhanced_completion", orig_c) if i < len(enh_rows) else orig_c

            src_id = meta.get("source_id", "SRC-001")
            src_info = self.sources.get(src_id, {
                "name": "National Cyber Crime Reporting Portal (MHA)",
                "url": "https://cybercrime.gov.in",
                "authority": "Ministry of Home Affairs / I4C"
            })

            # Emphasize prompt tokens over completion tokens for retrieval relevance
            prompt_tokens = tokenize(enh_p)
            completion_tokens = tokenize(enh_c[:300]) # take initial summary
            category_tokens = tokenize(meta.get("category", ""))

            all_tokens = prompt_tokens * 3 + category_tokens * 2 + completion_tokens
            token_counts = Counter(all_tokens)

            self.knowledge_items.append({
                "id": meta.get("id", f"KB-{i+1:04d}"),
                "category": meta.get("category", "general_cybersecurity"),
                "language": meta.get("language", "hi"),
                "prompt": enh_p,
                "completion": enh_c,
                "base_completion": orig_c,
                "token_counts": token_counts,
                "prompt_tokens_set": set(prompt_tokens),
                "source": src_info,
                "safety_critical": meta.get("safety_critical", "True") == "True"
            })

        self.total_docs = len(self.knowledge_items)

    def compute_idf(self):
        """Computes Inverse Document Frequency (IDF) across all knowledge items."""
        for item in self.knowledge_items:
            unique_tokens = set(item["token_counts"].keys())
            for t in unique_tokens:
                self.doc_freq[t] += 1

        self.idf = {}
        for token, count in self.doc_freq.items():
            # Standard smoothed IDF
            self.idf[token] = math.log((self.total_docs + 1) / (count + 1)) + 1.0

    def retrieve(
        self,
        query: str,
        detected_intent: str = None,
        top_k: int = 2,
        min_relevance_threshold: float = 0.12
    ) -> List[Dict[str, Any]]:
        """
        Retrieves top_k relevant verified knowledge items using TF-IDF cosine similarity.
        Returns empty list if the query has low similarity to avoid returning unrelated documents.
        """
        if not query or not self.knowledge_items:
            return []

        query_tokens = tokenize(query)
        if not query_tokens:
            return []

        query_counts = Counter(query_tokens)
        query_vec = {}
        query_norm_sq = 0.0

        for t, count in query_counts.items():
            weight = count * self.idf.get(t, 1.0)
            query_vec[t] = weight
            query_norm_sq += weight ** 2

        query_norm = math.sqrt(query_norm_sq)
        if query_norm == 0:
            return []

        scored: List[Tuple[float, Dict[str, Any]]] = []

        for item in self.knowledge_items:
            dot_product = 0.0
            doc_norm_sq = 0.0
            item_counts = item["token_counts"]

            for t, count in item_counts.items():
                w = count * self.idf.get(t, 1.0)
                doc_norm_sq += w ** 2
                if t in query_vec:
                    dot_product += query_vec[t] * w

            doc_norm = math.sqrt(doc_norm_sq)
            if doc_norm == 0:
                continue

            cosine_sim = dot_product / (query_norm * doc_norm)

            # Intent-category alignment boost (only if there is baseline similarity)
            if cosine_sim > 0.05 and detected_intent:
                clean_cat = item["category"].replace("_", "")
                clean_intent = detected_intent.replace("_", "")
                if clean_cat in clean_intent or clean_intent in clean_cat:
                    cosine_sim *= 1.25

            # Scaled relevance score (bounded [0.0, 1.0])
            relevance_score = min(1.0, round(cosine_sim, 3))

            if relevance_score >= min_relevance_threshold:
                # Attach relevance score to item copy
                item_copy = dict(item)
                item_copy["relevance_score"] = relevance_score
                scored.append((relevance_score, item_copy))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [item for _, item in scored[:top_k]]

retriever = KnowledgeRetriever()
