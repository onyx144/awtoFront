"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import AddFilters from "./addFilters";

const FiltersContainer: React.FC = () => {
  const [isAddFiltersVisible, setIsAddFiltersVisible] = useState(false);

  const handleAddFilterClick = () => setIsAddFiltersVisible(true);
  const handleSaveFilter = () => setIsAddFiltersVisible(false);

  return (
    <div>
      {isAddFiltersVisible ? (
        <AddFilters onSave={handleSaveFilter} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddFilterClick}
        >
          Додати новий фільтр
        </Button>
      )}
    </div>
  );
};

export default FiltersContainer;
