import React, { useEffect, useState } from "react";
import "./Subjects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import AddSubjectAPI from "../../api/subject/addSubjectAPI";
import GetSubjectAPI from "../../api/subject/getAllSubjectsAPI";
import UpdateSubjectAPI from "../../api/subject/updateSubjectAPI";
import DeleteSubjectAPI from "../../api/subject/deleteSubjectAPI";
import { Link } from "react-router-dom";
const Subjects = () => {
  useEffect(() => {
    getAllSubjectsApi();
  }, []);
  const [prevImage, setPrevImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [subject, setSubject] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const selectImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setPrevImage(image);
  };
  const openAddSubject = () => {
    document.querySelector(".add_subject").style.display = "flex";
  };
  const closeAddSubject = () => {
    document.querySelector(".add_subject").style.display = "none";
  };
  const openUpdateSubject = (subjectId, subject, prevImage) => {
    setSubjectId(subjectId);
    setSubject(subject);
    setPrevImage(prevImage);
    document.querySelector(".update_subject").style.display = "flex";
  };
  const closeUpdateSubject = () => {
    document.querySelector(".update_subject").style.display = "none";
  };
  const addSubjectApi = () => {
    if (prevImage === "" || subject === "") {
      setError("Please fill all fields");
    } else {
      const data = new FormData();
      data.append("name", subject);
      data.append("image", imageURL);
      AddSubjectAPI(data, setError, setLoading, setAllSubjects);
    }
  };
  const getAllSubjectsApi = () => {
    GetSubjectAPI(setError, setGetLoading, setAllSubjects);
  };
  const closeDeleteSubject = () => {
    document.querySelector(".delete_subject").style.display = "none";
  };
  const openDeleteSubject = (subjectId) => {
    setSubjectId(subjectId);
    document.querySelector(".delete_subject").style.display = "flex";
  };
  const updateSubjectApi = () => {
    if (prevImage === "" || subject === "") {
      setError("Please fill all fields");
    } else {
      const data = new FormData();
      data.append("name", subject);
      data.append("image", imageURL);
      UpdateSubjectAPI(data, setError, setLoading, setAllSubjects, subjectId);
    }
  };
  const deleteSubjectApi = () => {
    DeleteSubjectAPI(setError, setLoading, setAllSubjects, subjectId);
  };
  return (
    <section className="subjects">
      <div className="subjects_container">
        <h2>All Courses</h2>
        <div className="subjects_list">
          {getLoading ? (
            <span class="loader"></span>
          ) : (
            allSubjects?.map((item) => {
              return (
                <div className="subjects_item" key={item._id}>
                  <Link to={`/lectures/${item._id}`}>
                    <h3>{item.name}</h3>
                    <img src={item.image} />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
export default Subjects;
