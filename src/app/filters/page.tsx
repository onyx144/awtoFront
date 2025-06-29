"use client";
import React , {useEffect , useState} from 'react';
import FilterContainer from '@components/filter/filterContainer'
import {request} from '@request/request'
import BoxList from '@/components/filter/boxList';

interface FilterItem {
  category: string;
  values: string[];
  vehicleType: string[]; // Тип техники
  spareParts: string[]; // Названия запчастей
  years: string[]; // Годы выпуска
  brands: string[]; // Марки
  spareGroups: string[]; // Группы запчастей
  model: string[]; // Модель запчастей
  type: string[]; // Тип техники
  state: string[]; // Состояние запчастей
  regions: string[];  // Массив значений для этой категории (например, ["Мототехника", "Грузовые", ...])
}
  
interface FiltersState {
  id: number;
  message: boolean;
  data: FilterItem[];
  // Коллекция категорий, где ключ - это название категории, а значение - массив объектов FilterItem
}

export default function FilterPage() {
    
    const [isAddFiltersVisible, setIsAddFiltersVisible] = useState(false);
    const [filters, setFilters] = useState<FiltersState[]>([]);
    const getFilter = async () => {
        try {
            const response = await request('get', '/filters');
            console.log(response.data); 
            setFilters(response.data);      
          } catch (error) {
            console.error("Ошибка при получении пользователей:", error);
          }
      };

      useEffect(() => {
        getFilter();
      }, [isAddFiltersVisible]);
    return (
        <div>
            <FilterContainer isAddFiltersVisible={isAddFiltersVisible} setIsAddFiltersVisible ={setIsAddFiltersVisible}/>
            {!isAddFiltersVisible && (
  filters.length > 0 ? (
    <BoxList items={filters} onUpdate={getFilter} />
  ) : (
    <div>Поки ви не додали фільтр</div>
  )
)}

        </div>
    )
}