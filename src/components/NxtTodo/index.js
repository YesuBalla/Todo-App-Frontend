import {Component} from 'react'

import Header from '../Header'
import TodoList from '../TodoList'
import ThemeContext from '../../context/ThemeContext'

import {
    AppContainer,
    ContentContainer
} from './styledComponents'

class NxtTodo extends Component {
    
    render() {
        return(<ThemeContext.Consumer>
            {value => {
                const {isDarkTheme} = value 
                return (
                    <AppContainer>
                        <Header />
                        <ContentContainer>
                            <TodoList/>
                        </ContentContainer>
                    </AppContainer>
                )
            }}
        </ThemeContext.Consumer>)
    }
}

export default NxtTodo