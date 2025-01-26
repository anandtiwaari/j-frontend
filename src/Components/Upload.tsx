import { useCSVReader } from "react-papaparse";
import { useState } from "react";

const CsvParser = ({ setEmails, setErrorMessage }) => {
    const { CSVReader } = useCSVReader();

    const validateAndSetEmails = (results) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    
        const headerRow = results.data[0]; // First row contains headers
        const emailIndex = headerRow.indexOf("personal_email")||headerRow.indexOf("email")||headerRow.indexOf("Email"); // Find the index of 'personal_email'
    
        if (emailIndex === -1) {
            setErrorMessage("The CSV file does not contain a 'personal_email' column.");
            return;
        }
    
        const emails = results.data
            .slice(1) // Skip the header row
            .map(row => row[emailIndex]?.trim()) // Access the 'personal_email' column and trim
            .filter(email => emailRegex.test(email)); // Filter for valid emails
    
        if (emails.length > 0) {
            setEmails(emails); // Set valid emails
            setErrorMessage(""); // Clear the error message
        } else {
            setErrorMessage("The CSV file does not contain any valid email addresses.");
        }
    };


    const handleFileUpload = (results) => {
        if (Array.isArray(results.data) && results.data.length > 0) {
            validateAndSetEmails(results); // Validate and set emails or show an error
        } else {
            setErrorMessage("The CSV file appears to be empty or improperly formatted."); // Handle empty or invalid CSV
        }
    };


    return (
        <div style={styles.container}>
            <CSVReader onUploadAccepted={handleFileUpload}>
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                }: any) => (
                    <div style={styles.readerContainer}>
                        {/* File Upload Button */}
                        <button
                            type="button"
                            {...getRootProps()}
                            style={styles.uploadButton}
                        >
                            Browse File
                        </button>

                        {/* Display File Name */}
                        {acceptedFile && (
                            <div style={styles.fileInfo}>
                                <span>{acceptedFile.name}</span>
                            </div>
                        )}

                        {/* Remove File Button */}
                        {acceptedFile && (
                            <button
                                type="button"
                                {...getRemoveFileProps()}
                                style={styles.removeButton}
                            >
                                Remove
                            </button>
                        )}

                        {/* Progress Bar */}
                        <ProgressBar style={styles.progressBar} />
                    </div>
                )}

            </CSVReader>



        </div>
    );
};

// Inline styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
    },
    readerContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "400px",
    },
    uploadButton: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginBottom: "10px",
    },
    fileInfo: {
        marginTop: "10px",
        marginBottom: "10px",
        color: "#555",
    },
    removeButton: {
        padding: "5px 15px",
        backgroundColor: "#FF4136",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    progressBar: {
        marginTop: "10px",
        width: "100%",
    },
    errorMessage: {
        marginTop: "20px",
        color: "#FF4136",
        fontWeight: "bold",
    },
};

export default CsvParser;
