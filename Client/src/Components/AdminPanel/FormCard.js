import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { API_BASE, authHeaders } from "../../utils/api";

function isMongoObjectId(id) {
  if (id == null || typeof id !== "string") return false;
  return /^[a-fA-F0-9]{24}$/.test(id);
}

const FormCard = (props) => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  const formatTimeAgo = (ts) => {
    if (!ts) return "";
    const date = new Date(ts);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const updatedAt = props.form.updatedAt || props.form.createdAt;

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      if (isMongoObjectId(props.form.petId)) {
        const response = await fetch(
          `${API_BASE}/approving/${props.form.petId}`,
          {
            method: "PUT",
            body: JSON.stringify({
              email: props.form.email,
              phone: props.form.phoneNo,
              status: "Adopted",
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          setShowErrorPopup(true);
          return;
        }
      }

      const del = await fetch(
        `${API_BASE}/api/adopt/many/${encodeURIComponent(props.form.petId)}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );
      if (!del.ok) {
        setShowErrorPopup(true);
        return;
      }
      setShowApproved(true);
    } catch {
      setShowErrorPopup(true);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE}/api/adopt/${props.form._id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!response.ok) {
        setShowErrorPopup(true);
        throw new Error("Failed to delete form");
      }
      setShowDeletedSuccess(true);
    } catch (err) {
      setShowErrorPopup(true);
      console.error("Error deleting form:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="req-containter">
      <div className="pet-view-card">
        <div className="form-card-details">
          {props.form.userName && (
            <p>
              <b>Name: </b> {props.form.userName}
            </p>
          )}
          <p>
            <b>Email: </b> {props.form.email}
          </p>
          <p>
            <b>Phone Number: </b> {props.form.phoneNo}
          </p>
          {props.form.address && (
            <p>
              <b>Address: </b> {props.form.address}
            </p>
          )}
          {props.form.message && (
            <p>
              <b>Message: </b> {props.form.message}
            </p>
          )}
          <p>
            <b>Pet ID: </b> {props.form.petId}
          </p>
          <p>
            <b>Living Situation: </b> {props.form.livingSituation}
          </p>
          <p>
            <b>Previous Pet Experience: </b> {props.form.previousExperience}
          </p>
          <p>
            <b>Having Other Pets? </b> {props.form.familyComposition}
          </p>
          <p>{formatTimeAgo(updatedAt)}</p>
        </div>
        <div className="app-rej-btn">
          <button
            onClick={handleReject}
            disabled={isDeleting || isApproving}
          >
            {isDeleting ? <p>Deleting</p> : props.deleteBtnText}
          </button>
          <button type="button" onClick={() => setShowDetailsPopup(true)}>
            View Full
          </button>
          {props.approveBtn ? (
            <button
              onClick={handleApprove}
              disabled={isDeleting || isApproving}
            >
              {isApproving ? <p>Approving</p> : "Approve"}
            </button>
          ) : (
            ""
          )}
        </div>
        {showErrorPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Oops!... Connection Error</p>
            </div>
            <button
              onClick={() => setShowErrorPopup(!showErrorPopup)}
              className="close-btn"
            >
              Close <i className="fa fa-times" />
            </button>
          </div>
        )}
        {showApproved && (
          <div className="popup">
            <div className="popup-content">
              <p>Marked as adopted and queue cleared for this listing.</p>
              <p>
                Contact the adopter at{" "}
                <a href={`mailto:${props.form.email}`}>{props.form.email}</a>{" "}
                or{" "}
                <a href={`tel:${props.form.phoneNo}`}>{props.form.phoneNo}</a>.
              </p>
            </div>
            <button
              onClick={() => {
                props.updateCards();
                setShowApproved(!showApproved);
              }}
              className="close-btn"
            >
              Close <i className="fa fa-times" />
            </button>
          </div>
        )}

        {showDeletedSuccess && (
          <div className="popup">
            <div className="popup-content">
              <p>Request rejected successfully.</p>
            </div>
            <button
              onClick={() => {
                setShowDeletedSuccess(!showDeletedSuccess);
                props.updateCards();
              }}
              className="close-btn"
            >
              Close <i className="fa fa-times" />
            </button>
          </div>
        )}

        {showDetailsPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>{props.pet?.name || "Request"}</h2>
              {props.form.userName && (
                <p>
                  <b>Name: </b> {props.form.userName}
                </p>
              )}
              <p>
                <b>Email: </b> {props.form.email}
              </p>
              <p>
                <b>Phone Number: </b> {props.form.phoneNo}
              </p>
              {props.form.address && (
                <p>
                  <b>Address: </b> {props.form.address}
                </p>
              )}
              {props.form.message && (
                <p>
                  <b>Message: </b> {props.form.message}
                </p>
              )}
              <p>
                <b>Living Situation: </b> {props.form.livingSituation}
              </p>
              <p>
                <b>Previous Pet Experience: </b> {props.form.previousExperience}
              </p>
              <p>
                <b>Having Other Pets? </b> {props.form.familyComposition}
              </p>
              <p>{formatTimeAgo(updatedAt)}</p>
            </div>
            <button
              onClick={() => setShowDetailsPopup(false)}
              className="close-btn"
            >
              Close <i className="fa fa-times" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCard;
