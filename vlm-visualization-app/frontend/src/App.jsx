// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [imageFile, setImageFile] = useState(null);
//   const [prompt, setPrompt] = useState("");
//   const [model, setModel] = useState("llava:13b");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResponse("");

//     if (!imageFile) {
//       setError("Please upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("prompt", prompt);
//     formData.append("model", model);

//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/analyze", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.error) {
//         setError(data.error);
//       } else {
//         setResponse(data.response || "(No response)");
//       }
//     } catch (err) {
//       setError("Failed to reach backend: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Visualization Analyzer</h1>

//       <div className="layout">
//         {/* LEFT PANEL */}
//         <form className="left-panel" onSubmit={handleSubmit}>
//           <label className="field">
//             <span>Upload visualization:</span>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files[0] ?? null)}
//             />
//           </label>

//           <label className="field">
//             <span>Prompt:</span>
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Ask something about the visualization..."
//               rows={4}
//             />
//           </label>

//           <label className="field">
//             <span>Model:</span>
//             <select
//               value={model}
//               onChange={(e) => setModel(e.target.value)}
//             >
//               <option value="llava:7b">llava:7b</option>
//               <option value="llava:13b">llava:13b</option>
//               <option value="llava-llama3:8b">llava-llama3:8b</option>
//             </select>
//           </label>

//           <button type="submit" disabled={loading}>
//             {loading ? "Analyzing..." : "Analyze"}
//           </button>

//           {error && <p className="error">{error}</p>}
//         </form>

//         {/* RIGHT PANEL */}
//         <div className="right-panel">
//           <h2>Model Response</h2>
//           <div className="response-box">
//             {loading && <p>Thinking...</p>}
//             {!loading && response && <pre>{response}</pre>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const [prompt, setPrompt] = useState("");
//   const [model, setModel] = useState("qwen2.5vl:7b");
//   const [temperature, setTemperature] = useState(0.7);
//   const [maxTokens, setMaxTokens] = useState(256);

//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0] ?? null;
//     setImageFile(file);
//     setResponse("");
//     setError("");

//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImagePreview(url);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResponse("");

//     if (!imageFile) {
//       setError("Please upload an image first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("prompt", prompt);
//     formData.append("model", model);
//     formData.append("temperature", temperature.toString());
//     formData.append("max_tokens", maxTokens.toString());

//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/analyze", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.error) {
//         setError(data.error);
//       } else {
//         setResponse(data.response || "(No response)");
//       }
//     } catch (err) {
//       setError("Failed to reach backend: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Visualization Analyzer</h1>

//       <div className="layout">
//         {/* LEFT SIDE: controls */}
//         <form className="left-panel" onSubmit={handleSubmit}>
//           <button
//             type="button"
//             className="pill-button"
//             onClick={() => document.getElementById("file-input").click()}
//           >
//             Upload image
//           </button>
//           <input
//             id="file-input"
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />

//           <label className="field">
//             <span>Choose model:</span>
//             <select
//               value={model}
//               onChange={(e) => setModel(e.target.value)}
//             >
//               <option value="qwen2.5vl:7b">Qwen 2.5 VL · 7B</option>
//               <option value="gemma3:4b">Gemma 3 · 4B</option>
//               <option value="gemma3:12b">Gemma 3 · 12B</option>
//             </select>
//           </label>

//           <div className="slider-block">
//             <div className="slider-header">
//               <span>Temperature</span>
//               <span className="slider-value">{temperature.toFixed(2)}</span>
//             </div>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.05"
//               value={temperature}
//               onChange={(e) => setTemperature(parseFloat(e.target.value))}
//             />
//           </div>

//           <div className="slider-block">
//             <div className="slider-header">
//               <span>Max tokens</span>
//               <span className="slider-value">{maxTokens}</span>
//             </div>
//             <input
//               type="range"
//               min="32"
//               max="512"
//               step="32"
//               value={maxTokens}
//               onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
//             />
//           </div>

//           <label className="field">
//             <span>Prompt:</span>
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Ask the model about the visualization..."
//               rows={4}
//             />
//           </label>

//           <button type="submit" className="analyze-button" disabled={loading}>
//             {loading ? "Analyzing..." : "Analyze Visualization"}
//           </button>

//           {error && <p className="error">{error}</p>}
//         </form>

//         {/* RIGHT SIDE: image + output */}
//         <div className="right-panel">
//           <div className="card">
//             <h2>Image Uploaded</h2>
//             <div className="image-preview-box">
//               {imagePreview ? (
//                 <img
//                   src={imagePreview}
//                   alt="Uploaded visualization"
//                   className="preview-image"
//                 />
//               ) : (
//                 <p>No image uploaded yet.</p>
//               )}
//             </div>
//           </div>

//           <div className="card">
//             <h2>Model Output</h2>
//             <div className="response-box">
//               {loading && <p>Thinking...</p>}
//               {!loading && response && <pre>{response}</pre>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";
// import "./App.css";

// // Per-model defaults for temperature and max tokens
// const MODEL_CONFIG = {
//   "qwen2.5vl:7b": {
//     label: "Qwen 2.5 VL · 7B",
//     defaultTemp: 0.7,
//     defaultTokens: 256,
//   },
//   "gemma3:4b": {
//     label: "Gemma 3 · 4B",
//     defaultTemp: 0.6,
//     defaultTokens: 256,
//   },
//   "gemma3:12b": {
//     label: "Gemma 3 · 12B",
//     defaultTemp: 0.5,
//     defaultTokens: 256,
//   },
// };

// function App() {
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const [model, setModel] = useState("qwen2.5vl:7b");
//   const [prompt, setPrompt] = useState("");

//   // Initialize temp/tokens from the default model config
//   const [temperature, setTemperature] = useState(
//     MODEL_CONFIG["qwen2.5vl:7b"].defaultTemp
//   );
//   const [maxTokens, setMaxTokens] = useState(
//     MODEL_CONFIG["qwen2.5vl:7b"].defaultTokens
//   );

//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // When the model changes, reset temperature + maxTokens to that model's defaults
//   useEffect(() => {
//     const cfg = MODEL_CONFIG[model];
//     if (!cfg) return;
//     setTemperature(cfg.defaultTemp);
//     setMaxTokens(cfg.defaultTokens);
//   }, [model]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0] ?? null;
//     setImageFile(file);
//     setResponse("");
//     setError("");

//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImagePreview(url);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResponse("");

//     if (!imageFile) {
//       setError("Please upload an image first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("prompt", prompt);
//     formData.append("model", model);
//     formData.append("temperature", temperature.toString());
//     formData.append("max_tokens", maxTokens.toString());

//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/analyze", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.error) {
//         setError(data.error);
//       } else {
//         setResponse(data.response || "(No response)");
//       }
//     } catch (err) {
//       setError("Failed to reach backend: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Visualization Analyzer</h1>

//       <div className="layout">
//         {/* LEFT SIDE: controls */}
//         <form className="left-panel" onSubmit={handleSubmit}>
//           <button
//             type="button"
//             className="pill-button"
//             onClick={() => document.getElementById("file-input").click()}
//           >
//             Upload image
//           </button>
//           <input
//             id="file-input"
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />

//           <label className="field">
//             <span>Choose model:</span>
//             <select
//               value={model}
//               onChange={(e) => setModel(e.target.value)}
//             >
//               <option value="qwen2.5vl:7b">
//                 {MODEL_CONFIG["qwen2.5vl:7b"].label}
//               </option>
//               <option value="gemma3:4b">
//                 {MODEL_CONFIG["gemma3:4b"].label}
//               </option>
//               <option value="gemma3:12b">
//                 {MODEL_CONFIG["gemma3:12b"].label}
//               </option>
//             </select>
//           </label>

//           <div className="slider-block">
//             <div className="slider-header">
//               <span>Temperature</span>
//               <span className="slider-value">{temperature.toFixed(2)}</span>
//             </div>
//             <input
//               type="range"
//               min="0"
//               max="1.5"
//               step="0.05"
//               value={temperature}
//               onChange={(e) => setTemperature(parseFloat(e.target.value))}
//             />
//           </div>

//           <div className="slider-block">
//             <div className="slider-header">
//               <span>Max tokens</span>
//               <span className="slider-value">{maxTokens}</span>
//             </div>
//             <input
//               type="range"
//               min="32"
//               max="512"
//               step="32"
//               value={maxTokens}
//               onChange={(e) =>
//                 setMaxTokens(parseInt(e.target.value, 10))
//               }
//             />
//           </div>

//           <label className="field">
//             <span>Prompt:</span>
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Ask the model about the visualization..."
//               rows={4}
//             />
//           </label>

//           <button type="submit" className="analyze-button" disabled={loading}>
//             {loading ? "Analyzing..." : "Analyze Visualization"}
//           </button>

//           {error && <p className="error">{error}</p>}
//         </form>

//         {/* RIGHT SIDE: image + output */}
//         <div className="right-panel">
//           <div className="card">
//             <h2>Image Uploaded</h2>
//             <div className="image-preview-box">
//               {imagePreview ? (
//                 <img
//                   src={imagePreview}
//                   alt="Uploaded visualization"
//                   className="preview-image"
//                 />
//               ) : (
//                 <p>No image uploaded yet.</p>
//               )}
//             </div>
//           </div>

//           <div className="card">
//             <h2>Model Output</h2>
//             <div className="response-box">
//               {loading && <p>Thinking...</p>}
//               {!loading && response && <pre>{response}</pre>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import "./App.css";

// Per-model defaults for temperature and max tokens
const MODEL_CONFIG = {
  "qwen2.5vl:7b": {
    label: "Qwen 2.5 VL · 7B",
    defaultTemp: 0.7,
    defaultTokens: 256,
  },
  "gemma3:4b": {
    label: "Gemma 3 · 4B",
    defaultTemp: 0.6,
    defaultTokens: 256,
  },
  "gemma3:12b": {
    label: "Gemma 3 · 12B",
    defaultTemp: 0.5,
    defaultTokens: 256,
  },
};

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [model, setModel] = useState("qwen2.5vl:7b");

  // Initialize temp/tokens from the default model config
  const [temperature, setTemperature] = useState(
    MODEL_CONFIG["qwen2.5vl:7b"].defaultTemp
  );
  const [maxTokens, setMaxTokens] = useState(
    MODEL_CONFIG["qwen2.5vl:7b"].defaultTokens
  );

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // When the model changes, reset temperature + maxTokens to that model's defaults
  useEffect(() => {
    const cfg = MODEL_CONFIG[model];
    if (!cfg) return;
    setTemperature(cfg.defaultTemp);
    setMaxTokens(cfg.defaultTokens);
  }, [model]);

  const handleImageChange = (e) => {
    const file = e.target.files[0] ?? null;
    setImageFile(file);
    setResponse("");
    setError("");

    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");

    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("model", model);
    formData.append("temperature", temperature.toString());
    formData.append("max_tokens", maxTokens.toString());

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResponse(data.response || "(No response)");
      }
    } catch (err) {
      setError("Failed to reach backend: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Visualization Analyzer</h1>

      <div className="layout">
        {/* LEFT SIDE: controls */}
        <form className="left-panel" onSubmit={handleSubmit}>
          <button
            type="button"
            className="pill-button"
            onClick={() => document.getElementById("file-input").click()}
          >
            Upload image
          </button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <small style={{ textAlign: "left", color: "#6b7280" }}>
            The model will automatically critique and evaluate the uploaded
            visualization. No manual prompt needed.
          </small>

          <label className="field">
            <span>Choose model:</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="qwen2.5vl:7b">
                {MODEL_CONFIG["qwen2.5vl:7b"].label}
              </option>
              <option value="gemma3:4b">
                {MODEL_CONFIG["gemma3:4b"].label}
              </option>
              <option value="gemma3:12b">
                {MODEL_CONFIG["gemma3:12b"].label}
              </option>
            </select>
          </label>

          <div className="slider-block">
            <div className="slider-header">
              <span>Temperature</span>
              <span className="slider-value">{temperature.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1.5"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
          </div>

          <div className="slider-block">
            <div className="slider-header">
              <span>Max tokens</span>
              <span className="slider-value">{maxTokens}</span>
            </div>
            <input
              type="range"
              min="32"
              max="1024"
              step="32"
              value={maxTokens}
              onChange={(e) =>
                setMaxTokens(parseInt(e.target.value, 10))
              }
            />
          </div>

          <button type="submit" className="analyze-button" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Visualization"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        {/* RIGHT SIDE: image + output */}
        <div className="right-panel">
          <div className="card">
            <h2>Image Uploaded</h2>
            <div className="image-preview-box">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded visualization"
                  className="preview-image"
                />
              ) : (
                <p>No image uploaded yet.</p>
              )}
            </div>
          </div>

          <div className="card">
            <h2>Model Output</h2>
            <div className="response-box">
              {loading && <p>Thinking...</p>}
              {!loading && response && <pre>{response}</pre>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;