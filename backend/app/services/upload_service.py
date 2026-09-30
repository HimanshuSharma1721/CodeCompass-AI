import shutil
import zipfile
from pathlib import Path

from app.rag.indexer import build_index


UPLOAD_DIR = Path("backend/data/uploads")

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


class UploadService:

    @staticmethod
    def process_zip(zip_path: Path):

        extract_folder = UPLOAD_DIR / zip_path.stem

        if extract_folder.exists():
            shutil.rmtree(extract_folder)

        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(extract_folder)

        print(f"Repository extracted to {extract_folder}")

        build_index(str(extract_folder))

        return {
            "status": "success",
            "repository": zip_path.stem
        }