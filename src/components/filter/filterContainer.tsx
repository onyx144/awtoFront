"use client";

import { Button } from "@mui/material";
import AddFilters from "./addFilters";

interface FilterContainerProps {
  isAddFiltersVisible: boolean;

  setIsAddFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


const FiltersContainer: React.FC<FilterContainerProps> = ({ isAddFiltersVisible , setIsAddFiltersVisible }) => {
  //const [isAddFiltersVisible, setIsAddFiltersVisible] = useState(false);

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
          sx={{mt: 5}}
        >
          Додати новий фільтр
        </Button>
      )}
    </div>
  );
};

export default FiltersContainer;
