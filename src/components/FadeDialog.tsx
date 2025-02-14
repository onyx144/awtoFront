import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

interface FadeDialogProps {
  text: string;
  backgroundColor: string;
  open: boolean;
  onClose: () => void;
}

const FadeDialog: React.FC<FadeDialogProps> = ({ text, backgroundColor, open, onClose }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (open) {
      setOpacity(1);
      const fadeInterval = setInterval(() => {
        setOpacity((prev) => Math.max(0, prev - 0.2));
      }, 1000);

      setTimeout(() => {
        clearInterval(fadeInterval);
        onClose();
      }, 5000);

      return () => clearInterval(fadeInterval);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor,
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: 3,
        opacity,
        transition: "opacity 1s linear",
      }}
    >
      <Typography>{text}</Typography>
    </Box>
  );
};

export default FadeDialog;
