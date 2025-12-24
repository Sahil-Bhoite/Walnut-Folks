import React, { useState } from 'react';
import { SadPathData } from '../data/mockData';
import './EditValuesModal.css';

interface EditValuesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: SadPathData[]) => void;
    currentData: SadPathData[];
    previousData?: SadPathData[] | null;
    showOverwriteWarning: boolean;
}

const EditValuesModal: React.FC<EditValuesModalProps> = ({
    isOpen,
    onClose,
    onSave,
    currentData,
    previousData,
    showOverwriteWarning,
}) => {
    const [editedData, setEditedData] = useState<SadPathData[]>(currentData);
    const [showConfirm, setShowConfirm] = useState(showOverwriteWarning);

    if (!isOpen) return null;

    const handleValueChange = (index: number, newValue: string) => {
        const value = parseFloat(newValue) || 0;
        const updated = [...editedData];
        updated[index] = { ...updated[index], value: Math.max(0, Math.min(100, value)) };
        setEditedData(updated);
    };

    const handleSave = () => {
        onSave(editedData);
        onClose();
    };

    const handleConfirmOverwrite = () => {
        setShowConfirm(false);
    };

    if (showConfirm && previousData) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>x</button>

                    <div className="modal-header">
                        <h2 className="modal-title">Previous Values Found</h2>
                        <p className="modal-subtitle">
                            You have previously saved values. Do you want to overwrite them?
                        </p>
                    </div>

                    <div className="previous-values">
                        <h4>Your Previous Values:</h4>
                        {previousData.map((item, index) => (
                            <div key={index} className="previous-item">
                                <span className="previous-name">{item.name}</span>
                                <span className="previous-value">{item.value}%</span>
                            </div>
                        ))}
                    </div>

                    <div className="confirm-buttons">
                        <button className="cancel-button" onClick={onClose}>
                            Keep Previous
                        </button>
                        <button className="submit-button" onClick={handleConfirmOverwrite}>
                            Edit &amp; Overwrite
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>x</button>

                <div className="modal-header">
                    <h2 className="modal-title">Edit Chart Values</h2>
                    <p className="modal-subtitle">
                        Customize the Sad Path Analysis percentages
                    </p>
                </div>

                <div className="edit-form">
                    {editedData.map((item, index) => (
                        <div key={index} className="edit-row">
                            <div className="edit-label">
                                <span
                                    className="color-dot"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span>{item.name}</span>
                            </div>
                            <div className="edit-input-group">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={item.value}
                                    onChange={(e) => handleValueChange(index, e.target.value)}
                                    className="edit-input"
                                />
                                <span className="input-suffix">%</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="modal-actions">
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="submit-button" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditValuesModal;
