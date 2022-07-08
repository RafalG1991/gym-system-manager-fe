import React, {useState} from 'react';
import {SingleClass} from "../SingleClass/SingleClass";
import {Route, Routes} from "react-router-dom";
import {Calendar} from "../Calendar/Calendar";

export const ClassesView = () => {
  const [id, setId] = useState('');

  const getIdHandler = (id: string) => {
    setId(id);
  }

  return <Routes>
      <Route path='/' element={<Calendar getIdOnClick={getIdHandler}/>}/>
      <Route path='/*' element={<SingleClass eventId={id}/>}/>
    </Routes>

}