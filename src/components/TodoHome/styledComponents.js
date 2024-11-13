import styled from 'styled-components'

export const AppContainer = styled.div`
    min-height: 100vh;
    background-color: ${props => props.$bgcolor};
` 

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ListHeading = styled.h1`
    font-size: 30px;
    font-weight: bold;
    color: #e3404b;
    font-family: monospace;
    margin: 0px;
    margin-top: 10px;
`

export const AddTodoContainer = styled.div`
    width: 100%;
    height: 240px;
`

export const TodoListContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const EmptyTodosContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 30px;
  background-color: ${props => props.$cardcolor};
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`

export const EmptyTodosLogo = styled.img`
  width: 40%;
`

export const EmptyTodosCaption = styled.p`
  margin: 0px;
  color: ${props => props.color};
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin-top: 5%;
`

export const EmptyTodosImage = styled.img`
  width: 60%;
`

export const EmptyTodosImageContainer = styled.div`
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const EmptyTodosLogoContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HorizontalLine = styled.div`
  border: 1px solid #e3404b;
  width: 90%;
  opacity: 0.5;
`