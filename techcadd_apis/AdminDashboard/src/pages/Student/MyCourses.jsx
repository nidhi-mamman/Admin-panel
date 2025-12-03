import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [courseData, setCourseData] = useState({
    name: "",
    course_progress: {
      total_lessons: 0,
      completed_lessons: 0,
      progress_percentage: 0,
    },
    modules: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("http://127.0.0.1:8000/api/student/lms/my-course/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ Set course safely even if some fields are missing
          setCourseData({
            name: data.course?.name || "N/A",
            course_progress: data.course?.course_progress || {
              total_lessons: 0,
              completed_lessons: 0,
              progress_percentage: 0,
            },
            modules: data.course?.modules || [],
          });
        } else {
          setError(data.message || "Failed to fetch course details ❌");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading course data...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  const { name, course_progress, modules } = courseData;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        📘 {name}
      </h2>

      <div
        style={{
          background: "#f9f9f9",
          padding: "16px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>📊 Course Progress</h3>
        <p><strong>Total Lessons:</strong> {course_progress?.total_lessons || 0}</p>
        <p><strong>Completed Lessons:</strong> {course_progress?.completed_lessons || 0}</p>

        {/* Progress bar */}
        <div
          style={{
            background: "#e0e0e0",
            height: "15px",
            borderRadius: "8px",
            marginTop: "8px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${course_progress?.progress_percentage || 0}%`,
              background: "#007bff",
              height: "100%",
              borderRadius: "8px",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>
        <p style={{ marginTop: "8px" }}>
          Progress: <strong>{course_progress?.progress_percentage || 0}%</strong>
        </p>
      </div>

      <div>
        <h3>📚 Modules</h3>
        {modules?.length > 0 ? (
          <ul>
            {modules.map((mod, index) => (
              <li key={index}>
                <strong>{mod.name}</strong>
                {mod.lessons && (
                  <ul>
                    {mod.lessons.map((lesson, i) => (
                      <li key={i}>{lesson.title}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No modules available yet.</p>
        )}
      </div>

      <hr style={{ margin: "24px 0" }} />

      <Link
        to="/student/dashboard"
        style={{
          textDecoration: "none",
          color: "white",
          background: "#007bff",
          padding: "10px 16px",
          borderRadius: "8px",
          display: "inline-block",
        }}
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
