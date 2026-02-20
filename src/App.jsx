import React, { useState } from "react";
import "./App.css";
const resultData = [
  { id: "101", name: "Arjun", Maths: 85, WebDevelopment: 78, OOPS: 92, Java: 74, DSA: 88 },
  { id: "102", name: "Mano", Maths: 91, WebDevelopment: 88, OOPS: 79, Java: 85, DSA: 95 },
  { id: "103", name: "Rahul", Maths: 55, WebDevelopment: 72, OOPS: 58, Java: 68, DSA: 75 },
  { id: "104", name: "Ravi", Maths: 95, WebDevelopment: 89, OOPS: 94, Java: 90, DSA: 93 },
  { id: "105", name: "Kiran", Maths: 45, WebDevelopment: 60, OOPS: 65, Java: 50, DSA: 48 }
];
const subjects = ["Maths", "WebDevelopment", "OOPS", "Java", "DSA"];
const PASS_MARK = 60;
function App() {
  const [role, setRole] = useState("Student");
  const [studentId, setStudentId] = useState("");
  const calculateTotal = (student) =>
    subjects.reduce((sum, sub) => sum + student[sub], 0);
  const calculateAverage = (subject) =>
    resultData.reduce((sum, s) => sum + s[subject], 0) /
    resultData.length;
  const calculateStdDev = (subject) => {
    const mean = calculateAverage(subject);
    const variance =
      resultData.reduce((sum, s) => {
        return sum + Math.pow(s[subject] - mean, 2);
      }, 0) / resultData.length;
    return Math.sqrt(variance);
  };
  const calculatePassPercentage = (subject) => {
    const passCount = resultData.filter(
      (s) => s[subject] >= PASS_MARK
    ).length;
    return ((passCount / resultData.length) * 100).toFixed(2);
  };
  const getBestSubject = (student) =>
    subjects.reduce((best, sub) =>
      student[sub] > student[best] ? sub : best
    );
  const getLeastSubject = (student) =>
    subjects.reduce((least, sub) =>
      student[sub] < student[least] ? sub : least
    );
  const sortedStudents = [...resultData].sort(
    (a, b) => calculateTotal(b) - calculateTotal(a)
  );
  const selectedStudent = sortedStudents.find(
    (s) => s.id === studentId
  );
  const subjectAverages = subjects.map((sub) => ({
    subject: sub,
    average: calculateAverage(sub)
  }));
  const strongestSubject = subjectAverages.reduce((max, sub) =>
    sub.average > max.average ? sub : max
  );
  const weakestSubject = subjectAverages.reduce((min, sub) =>
    sub.average < min.average ? sub : min
  );
  return (
    <div className="container">
      <h1 className="title">Class Performance Dashboard</h1>
      <div className="role-selection">
        <button className={role === "Student" ? "active-role" : ""} onClick={() => setRole("Student")}>Student</button>
        <button className={role === "Faculty" ? "active-role" : ""} onClick={() => setRole("Faculty")}>Faculty</button>
        <button className={role === "HOD" ? "active-role" : ""} onClick={() => setRole("HOD")}>HOD</button>
      </div>
      <div className="card">
        {role === "Student" && (
          <>
            <h2>Student Portal</h2>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            {selectedStudent && (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>ID</th>
                      <th>Name</th>
                      {subjects.map((sub) => <th key={sub}>{sub}</th>)}
                      <th>Total</th>
                      <th>Best</th>
                      <th>Least</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{sortedStudents.findIndex(s => s.id === selectedStudent.id) + 1}</td>
                      <td>{selectedStudent.id}</td>
                      <td>{selectedStudent.name}</td>
                      {subjects.map((sub) => (
                        <td key={sub} className={selectedStudent[sub] >= PASS_MARK ? "pass" : "fail"}>
                          {selectedStudent[sub]}
                        </td>
                      ))}
                      <td>{calculateTotal(selectedStudent)}</td>
                      <td>{getBestSubject(selectedStudent)}</td>
                      <td>{getLeastSubject(selectedStudent)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        {(role === "Faculty" || role === "HOD") && (
          <>
            <h2>{role} Dashboard</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>ID</th>
                    <th>Name</th>
                    {subjects.map((sub) => <th key={sub}>{sub}</th>)}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      {subjects.map((sub) => (
                        <td key={sub} className={student[sub] >= PASS_MARK ? "pass" : "fail"}>
                          {student[sub]}
                        </td>
                      ))}
                      <td>{calculateTotal(student)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Subject Analytics</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Average</th>
                    <th>Pass(more than 60) %</th>
                    {role === "HOD" && <th>Std Deviation</th>}
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((sub) => (
                    <tr key={sub}>
                      <td>{sub}</td>
                      <td>{calculateAverage(sub).toFixed(2)}</td>
                      <td>{calculatePassPercentage(sub)}%</td>
                      {role === "HOD" && (
                        <td>{calculateStdDev(sub).toFixed(2)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {role === "HOD" && (
              <>
                <h3>Strongest and Weakest Subjects</h3>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Subject</th>
                        <th>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Strongest</td>
                        <td>{strongestSubject.subject}</td>
                        <td>{strongestSubject.average.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Weakest</td>
                        <td>{weakestSubject.subject}</td>
                        <td>{weakestSubject.average.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}
export default App;