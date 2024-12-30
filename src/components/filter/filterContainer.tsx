"use client";

import { useState } from 'react';
import AddFiltersPopup from './addFiltersPopup';
import { Button } from '@mui/material';
import AddFilters from './addFilters';

const FiltersContainer: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
     <AddFilters/>
    </div>
  );
};

export default FiltersContainer;