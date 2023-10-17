import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import supabase from "../../client";
import Form from "react-bootstrap/Form";

function BioForm({ show, onHide, onFileSelect }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        // Upload the file to your "dps" folder in Supabase storage
        const { data, error } = await supabase.storage
          .from("image-uploads/dps")
          .upload(file.name, file);

        if (error) {
          console.error("Error uploading file:", error);
        } else {
          onFileSelect(file.name)
          setIsLoading(false);
          onHide(); // Close the modal
          // You can store the file URL or key in your database for future retrieval.
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Personal Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="label">Profile photo</Form.Label>
            <Form.Control
              className="input"
              type="file"
              name="photo"
              size="lg"
              onChange={handleFileUpload}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
        <button
          className="save-btn"
          onClick={handleFileUpload}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Save changes"}
        </button>
    </Modal>
  );
}

export default BioForm;