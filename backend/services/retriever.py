import os
import csv
import re
from typing import List, Dict, Any

class KnowledgeRetriever:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = data_dir
        self.knowledge_items: List[Dict[str, Any]] = []
        self.sources: Dict[str, Dict[str, str]] = {}
        self.load_sources()
        self.load_datasets()

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
            
            # Prefer enhanced completion if available
            enh_p = enh_rows[i].get("enhanced_prompt", orig_p) if i < len(enh_rows) else orig_p
            enh_c = enh_rows[i].get("enhanced_completion", orig_c) if i < len(enh_rows) else orig_c

            src_id = meta.get("source_id", "SRC-001")
            src_info = self.sources.get(src_id, {
                "name": "National Cyber Crime Reporting Portal",
                "url": "https://cybercrime.gov.in",
                "authority": "Ministry of Home Affairs"
            })

            # Tokenize for quick lexical search
            all_text = f"{enh_p} {enh_c} {meta.get('category', '')} {meta.get('scenario_type', '')}"
            tokens = set(re.findall(r'\w+', all_text.lower()))

            self.knowledge_items.append({
                "id": meta.get("id", f"KB-{i+1:04d}"),
                "category": meta.get("category", "general_cybersecurity"),
                "language": meta.get("language", "hi"),
                "prompt": enh_p,
                "completion": enh_c,
                "base_completion": orig_c,
                "tokens": tokens,
                "source": src_info,
                "safety_critical": meta.get("safety_critical", "True") == "True"
            })

    def retrieve(self, query: str, detected_intent: str = None, top_k: int = 2) -> List[Dict[str, Any]]:
        """
        Retrieves top_k most relevant verified knowledge pairs based on token overlap & category alignment.
        """
        if not query or not self.knowledge_items:
            return []

        query_tokens = set(re.findall(r'\w+', query.lower()))
        scored = []

        for item in self.knowledge_items:
            overlap = len(query_tokens.intersection(item["tokens"]))
            score = overlap

            # Category boost if intent aligns
            if detected_intent and item["category"] in detected_intent:
                score += 3

            # Exact keyword phrase boosts
            if any(k in query.lower() for k in ["qr", "pin", "पिन", "कलेक्ट"]) and item["category"] == "upi_payment_fraud":
                score += 4
            if any(k in query.lower() for k in ["बिजली", "electricity", "bill", "yono", "kyc"]) and item["category"] == "phishing_fake_kyc":
                score += 4
            if any(k in query.lower() for k in ["digital arrest", "डिजिटल अरेस्ट", "police", "cbi"]) and item["category"] == "digital_arrest_coercion":
                score += 4
            if any(k in query.lower() for k in ["apk", "anydesk", "teamviewer"]) and item["category"] == "remote_access_apk_trojans":
                score += 4

            if score > 0:
                scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [item for _, item in scored[:top_k]]

retriever = KnowledgeRetriever()
