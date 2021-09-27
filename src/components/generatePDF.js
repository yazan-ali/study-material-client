import React from "react";
import jsPDF from 'jspdf';

export default function GeneratePDF({ questions, course_name, quiz_title }) {

    const generatePDF = () => {
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#content"), {
            callback: (pdf) => {
                pdf.save("quiz.pdf")
            }
        })
    }

    const options = ["a", "b", "c", "d"]

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ marginLeft: 30, width: "100%", padding: 4, }} id="content">
                <h2 style={{ width: "100%", textAlign: "center" }}>{`${course_name} ${quiz_title && `: ${quiz_title}`} `}</h2>
                {
                    questions.map((q, idx) => (
                        <div>
                            <h3>{`Q${idx + 1}. ${q.question}`}</h3>
                            <div>
                                {
                                    q.answersOptions.map((a, idx) => (
                                        <p
                                            style={{ backgroundColor: q.correctAnswer === a.answerText ? "gray" : "" }}>
                                            {`${options[idx]}. ${a.answerText}`}
                                        </p>))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={generatePDF}>Generate Pdf</button>
        </div >
    );
}

