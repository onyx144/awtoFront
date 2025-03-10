"use client";

import React , {useState} from "react";
import dynamic from "next/dynamic";
import { Box, Button, Typography, FormControlLabel , Checkbox, Paper } from "@mui/material";
import { request } from "@request/request";
import { useRouter } from "next/navigation";
import select from "@json/select.json"
import {extractIdNamePairs , getNamesByIds , mapToObject } from '@request/function'

interface FilterItem {
  category: string;
  values: string[];
 
}

type Data = {
  id: number;
  data: FilterItem[];
  message: boolean;
};

type BoxListProps = {
  items: Data[];
  onUpdate: () => void;
};

const BoxList: React.FC<BoxListProps> = ({ items, onUpdate }) => {
  const router = useRouter();
  const nameToIdMap =  extractIdNamePairs(select); 
  const [checked, setChecked] = useState<boolean>(false); 
  const valuesMap = mapToObject(nameToIdMap);
  const redirectToHomeWithFilters = (filters: FilterItem[]) => {
    const queryParams = filters
      .map(
        (filter) =>
          `${encodeURIComponent(filter.category)}=${encodeURIComponent(
            filter.values.join(",")
          )}`
      )
      .join("&");

    router.push(`/?${queryParams}`);
  };

  const messageUpdate = async (id: number , event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;

    try {
      await request('post', `/filters/message/${id}`, { message: newChecked });
      console.log('Обновили бро');
      onUpdate();
    } catch (error) {
      console.error('Ошибка обновления:', error);
      setChecked(!newChecked); // откат при ошибке
    } 
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await request("delete", `/filters/${id}`);
      console.log("Удаление успешно:", response.data);
      onUpdate();
      return response.data;
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      throw error;
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {items.map((item) => (
        <Box key={item.id} sx={{ marginBottom: 2, mt: 5, width: "90%" }}>
          <Paper
            sx={{
              padding: 2,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box className="double-flex">
              <Box >
            {item.data.map((filter, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "12px" }}>
                  {filter.category || "Нет данных"}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {filter.values.length > 0 ? getNamesByIds(filter.values , valuesMap).join(", ") : "Нет данных"}
                </Typography>
              </Box>
            ))}
            </Box>
            <Box>
            <FormControlLabel
      control={
        <Checkbox
          checked={item.message}
          onChange={(event) => messageUpdate(item.id, event)}
          sx={{ transform: 'scale(0.6)' ,  padding: '0px'}} 
        />
      }
      label={'Включити фільтр'}
      sx={{ fontSize: '12px', '& .MuiTypography-root': { fontSize: '12px' } ,
      marginTop: '-15px',
    gap: '0px' , }}
    />
            </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 1,
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={() => redirectToHomeWithFilters(item.data)}
                color="primary"
                sx={{ flex: 1 }}
              >
                Шукати
              </Button>
              <Button variant="outlined" color="secondary" sx={{ flex: 1 }}>
                Редагувати
              </Button>
              <Button
                variant="contained"
                onClick={() => deleteItem(item.id)}
                color="error"
                sx={{ flex: 1 }}
              >
                Видалити
              </Button>
            </Box>
          </Paper>
        </Box>
      ))}
    </div>
  );
};

export default dynamic(() => Promise.resolve(BoxList), { ssr: false });
