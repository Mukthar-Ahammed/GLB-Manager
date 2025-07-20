import React, { useRef, useState } from "react";
import "./upload.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GLBViewer from "../components/GLBViewer.js";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";
import axios from "axios";
import CanvasLoader from "../components/CanvasLoader.js";
import Loader2 from "../components/Loader2.js";

function Uploader() {
  const [formData, setFormData] = useState({
    model_name: "",
    file: null,
  });

  const [glbUrl, setglbUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const inRef = useRef(null);

  const Handlechange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".glb")) {
      setFormData({ ...formData, file });
      setglbUrl(URL.createObjectURL(file));
    } else {
      alert("Upload the correct file format (.glb)");
      e.target.value = "";
    }
  };

  const HandleUpload = async (e) => {
    e.preventDefault();
    if (!formData.model_name || !formData.file) {
      toast.error("Fill or select the required field");
      return;
    }

    const data = new FormData();
    data.append("name", formData.model_name);
    data.append("file", formData.file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:1000/api/Upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Uploaded Successfully");
      console.log(res.data);
    } catch (error) {
      console.log("Error Uploading", error);
      toast.error("Error Uploading");
    } finally {
      setLoading(false);
    }
  };

  const TriggerUpload = () => {
    inRef.current.click();
  };

  return (
    <div className="Uploadmain">
      {loading ? (
        <div className="upload-loader">
          <Loader2 />
        </div>
      ) : (
        <>
          <div className="formcontainer">
            <form action="" method="post" onSubmit={HandleUpload}>
              <input
                type="text"
                placeholder="Enter the model name"
                value={formData.model_name}
                onChange={(e) =>
                  setFormData({ ...formData, model_name: e.target.value })
                }
              />

              <div className="fileup">
                <input
                  type="file"
                  accept=".glb"
                  ref={inRef}
                  onChange={Handlechange}
                  hidden
                />

                <Upload className="icon" onClick={TriggerUpload} />
                <p>Click to Upload file</p>
              </div>

              <div className="btn">
                <button type="submit">Upload</button>
              </div>
            </form>
          </div>

          {glbUrl && (
            <div className="modelpreview">
              <Canvas camera={{ position: [0, 0, 2] }}>
                <ambientLight />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={<CanvasLoader />}>
                  <GLBViewer url={glbUrl} />
                </Suspense>
                <OrbitControls />
              </Canvas>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Uploader;
