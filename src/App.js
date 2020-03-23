import React from 'react';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Frame = styled.div`
  width: 400px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px #eee;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f6fa;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${props =>
    props.isTodia &&
    css`
      border: 1px solid #eee;
    `}

  ${props =>
    props.isSelected &&
    css`
      background-color: #eee;
    `}
`;

export function App() {
  const DIAS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DIAS_ANO_BISS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DIAS_DO_ANO_BISS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
  const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DEC'];

  const hoje = new Date();
  const [date, setDate] = useState(hoje);
  const [dia, setDia] = useState(date.getDate());
  const [mes, setMes] = useState(date.getMonth());
  const [ano, setAno] = useState(date.getFullYear());
  const [diaInicial, setDiaInicial] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDia(date.getDate());
    setMes(date.getMonth());
    setAno(date.getFullYear());
    setDiaInicial(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  }

  const dias = isLeapYear ? DIAS_ANO_BISS : DIAS;

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(new Date(ano, mes - 1, dia))}>Prev</Button>
        <div>
          {MESES[mes]} {ano}
        </div>
        <Button onClick={() => setDate(new Date(ano, mes + 1, dia))}>Next</Button>
      </Header>
      <Body>
        {DIAS_DO_ANO_BISS.map(d => (
          <Day key={d}>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(dias[mes] + (diaInicial - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (diaInicial - 2);
            return (
              <Day
                key={index}
                isTodia={d === hoje.getDate()}
                isSelected={d === dia}
                onClick={() => setDate(new Date(ano, mes, d))}
              >
                {d > 0 ? d : ''}
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
}

export default App;