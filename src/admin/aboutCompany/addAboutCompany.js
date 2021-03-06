import { useState } from "react"
import { useNavigate } from "react-router-dom";
import API from "../../containers/utils/axios";
import { bottomForm } from "../adminComponents/components"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAboutCompany() {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState("")
    const [image, setImage] = useState("")
    const notify = (text, status) => {

        if (status === 200 || status === 201) toast.success(`${text}`)
        if (status === 400 || status === 401 || status === 403 || status === 404 || status === 500 || status === 503) toast.error(`${text}`)
    }
    const Submit = () => {
        let form = new FormData();
        form.append("title", companyName);
        form.append("image", image);

        API.post("/aboutCompany", form)
            .then((res) => {
                notify(`Success`, res.status)
                setTimeout(() => {
                    navigate("/adminMain")
                }, 5500)
            })
            .catch(err => notify(err.response?.data?.message, err.response?.status))
    };

    return (
        <div>
            <ToastContainer />
            <div className="col-lg-12 customer-login">
                <div className="well">
                    <p>
                        <strong>About Company</strong>
                    </p>
                    <div className="form-group">
                        <label className="control-label ">Enter your Company Name</label>

                        <input
                            type="text"
                            className="form-control"
                            onChange={({ target }) => setCompanyName(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Image</label>

                        <input type="file" className="form-control" onChange={({ target }) => setImage(target.files[0])} />
                    </div>
                </div>
                <div className="bottom-form" style={bottomForm}>

                    <button
                        className="btn btn-default pull-right col-lg-4"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                    <button
                        className="btn btn-default pull-right col-lg-4"
                        onClick={() => {
                            Submit();
                            notify();
                        }}
                    >
                        Create About Company
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AddAboutCompany