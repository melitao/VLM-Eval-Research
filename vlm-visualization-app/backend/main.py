# from fastapi import FastAPI, UploadFile, File, Form
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# from io import BytesIO
# from PIL import Image
# import base64
# import requests

# OLLAMA_URL = "http://localhost:11434/api/chat"

# app = FastAPI()

# # Allow your React dev server to call this API
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# def image_to_base64_bytes(image_bytes: bytes) -> str:
#     img = Image.open(BytesIO(image_bytes)).convert("RGB")
#     buffer = BytesIO()
#     img.save(buffer, format("PNG"))
#     return base64.b64encode(buffer.getvalue()).decode("utf-8")


# @app.post("/analyze")
# async def analyze(
#     image: UploadFile = File(...),
#     prompt: str = Form("Explain this visualization."),
#     model: str = Form("llava:13b"),
# ):
#     # Read uploaded file
#     raw_bytes = await image.read()
#     img_b64 = image_to_base64_bytes(raw_bytes)

#     payload = {
#         "model": model,
#         "stream": False,
#         "messages": [
#             {
#                 "role": "user",
#                 "content": prompt,
#                 "images": [img_b64],
#             }
#         ],
#     }

#     try:
#         r = requests.post(OLLAMA_URL, json=payload)
#         r.raise_for_status()
#     except Exception as e:
#         return {"error": f"Error talking to Ollama: {e}"}

#     data = r.json()
#     content = data.get("message", {}).get("content", "")

#     return {"response": content}

# from fastapi import FastAPI, UploadFile, File, Form
# from fastapi.middleware.cors import CORSMiddleware

# from io import BytesIO
# from PIL import Image
# import base64
# import requests

# OLLAMA_URL = "http://localhost:11434/api/chat"

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://localhost:3000",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# def image_to_base64_bytes(image_bytes: bytes) -> str:
#     img = Image.open(BytesIO(image_bytes)).convert("RGB")
#     buffer = BytesIO()
#     img.save(buffer, format="PNG")
#     return base64.b64encode(buffer.getvalue()).decode("utf-8")


# @app.post("/analyze")
# async def analyze(
#     image: UploadFile = File(...),
#     prompt: str = Form("Explain this visualization."),
#     model: str = Form("qwen2.5vl:7b"),
#     temperature: float = Form(0.7),
#     max_tokens: int = Form(256),
# ):
#     # read image
#     raw_bytes = await image.read()
#     img_b64 = image_to_base64_bytes(raw_bytes)

#     # build Ollama payload
#     payload = {
#         "model": model,
#         "stream": False,
#         "messages": [
#             {
#                 "role": "user",
#                 "content": prompt,
#                 "images": [img_b64],
#             }
#         ],
#         "options": {
#             "temperature": temperature,
#             "num_predict": max_tokens,
#         },
#     }

#     try:
#         r = requests.post(OLLAMA_URL, json=payload)
#         if r.status_code != 200:
#             # helpful error text for debugging
#             return {"error": f"Ollama error {r.status_code}: {r.text}"}
#     except Exception as e:
#         return {"error": f"Error talking to Ollama: {e}"}

#     data = r.json()
#     content = data.get("message", {}).get("content", "")

#     return {"response": content}

# from fastapi import FastAPI, UploadFile, File, Form
# from fastapi.middleware.cors import CORSMiddleware

# from io import BytesIO
# from PIL import Image
# import base64
# import requests

# OLLAMA_URL = "http://localhost:11434/api/chat"

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://localhost:3000",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# CRITIQUE_PROMPT = """
# You are an expert in data visualization and graphical perception.

# You will be given an image of a data visualization (such as a chart, graph, or infographic).
# Your task is to:
# 1) Briefly describe what the visualization appears to be trying to show.
# 2) Critique the visualization: list specific issues with the design (encoding choices, axes, labels, color, clutter, misleading elements, accessibility, etc.).
# 3) Suggest concrete improvements or alternative visualization types that would communicate the data more clearly and honestly.

# Write your answer in short paragraphs or bullet points. Focus on clarity and practical advice.
# """

# def image_to_base64_bytes(image_bytes: bytes) -> str:
#   img = Image.open(BytesIO(image_bytes)).convert("RGB")
#   buffer = BytesIO()
#   img.save(buffer, format="PNG")
#   return base64.b64encode(buffer.getvalue()).decode("utf-8")


# @app.post("/analyze")
# async def analyze(
#     image: UploadFile = File(...),
#     model: str = Form("qwen2.5vl:7b"),
#     temperature: float = Form(0.7),
#     max_tokens: int = Form(256),
# ):
#     # read image
#     raw_bytes = await image.read()
#     img_b64 = image_to_base64_bytes(raw_bytes)

#     prompt_text = CRITIQUE_PROMPT.strip()

#     # build Ollama payload
#     payload = {
#         "model": model,
#         "stream": False,
#         "messages": [
#             {
#                 "role": "user",
#                 "content": prompt_text,
#                 "images": [img_b64],
#             }
#         ],
#         "options": {
#             "temperature": temperature,
#             "num_predict": max_tokens,
#         },
#     }

#     try:
#         r = requests.post(OLLAMA_URL, json=payload)
#         if r.status_code != 200:
#             return {"error": f"Ollama error {r.status_code}: {r.text}"}
#     except Exception as e:
#         return {"error": f"Error talking to Ollama: {e}"}

#     data = r.json()
#     content = data.get("message", {}).get("content", "")

#     return {"response": content}

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from io import BytesIO
from PIL import Image
import base64
import requests

OLLAMA_URL = "http://localhost:11434/api/chat"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- CALVI-aware critique prompt --------
CRITIQUE_PROMPT = """
I am about to show you an image of a data visualization.

Your job is to (1) summarize it, (2) critique it, and (3) identify any CALVI misleaders that are present.

Use the following CALVI misleaders and their meanings:

- Cherry Picking: Only a subset of data is shown, which can mislead if viewers are asked to infer something about the whole.
- Concealed Uncertainty: Uncertainty, error, or variability is not shown, giving a false sense of precision or confidence.
- Inappropriate Aggregation: Data are aggregated in a way that can lead to inaccurate or distorted conclusions.
- Manipulation of Scales – Inappropriate Order: Axis labels or legend categories are in a non-sensible or misleading order.
- Manipulation of Scales – Inappropriate Scale Range: Axis or color ranges are stretched, truncated, or binned in ways that distort differences.
- Manipulation of Scales – Inappropriate Use of Scale Functions: Non-linear scales are used in a way that can mislead (for example, unexplained log scales).
- Manipulation of Scales – Unconventional Scale Directions: Scales run in an unusual direction (e.g., reversed axes) that may confuse or mislead.
- Misleading Annotations: Annotations, labels, or callouts contradict the data or make the visualization harder to interpret correctly.
- Missing Data: The visualization implies data exist but some values or categories are missing or hidden.
- Missing Normalization: Raw counts are shown where normalized or relative measures would be more appropriate, leading to misleading comparisons.
- Overplotting: Too many elements are plotted, obscuring data and making patterns or differences hard to see.

Please structure your response in the following format exactly:

Summary: [Briefly describe what the visualization is attempting to show]

Critique: [Discuss design issues, clarity problems, misleading elements, accessibility concerns, etc.]

CALVI Misleaders Detected: [List any CALVI misleaders (by name) that apply, with a short explanation for each. If none clearly apply, write: "No CALVI misleaders detected."]

Improvements: [Give concrete suggestions for improving the visualization or redesigning it to be clearer and less misleading]

Base your evaluation ONLY on what is visible in the chart.
Do not invent data or context that are not shown.
Keep your analysis clear, specific, and helpful.
"""
# ---------------------------------------------


def image_to_base64_bytes(image_bytes: bytes) -> str:
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    model: str = Form("qwen2.5vl:7b"),
    temperature: float = Form(0.7),
    max_tokens: int = Form(256),
):
    # read image
    raw_bytes = await image.read()
    img_b64 = image_to_base64_bytes(raw_bytes)

    prompt_text = CRITIQUE_PROMPT.strip()

    # build Ollama payload
    payload = {
        "model": model,
        "stream": False,
        "messages": [
            {
                "role": "user",
                "content": prompt_text,
                "images": [img_b64],
            }
        ],
        "options": {
            "temperature": temperature,
            "num_predict": max_tokens,
        },
    }

    try:
        r = requests.post(OLLAMA_URL, json=payload)
        if r.status_code != 200:
            return {"error": f"Ollama error {r.status_code}: {r.text}"}
    except Exception as e:
        return {"error": f"Error talking to Ollama: {e}"}

    data = r.json()
    content = data.get("message", {}).get("content", "")

    return {"response": content}