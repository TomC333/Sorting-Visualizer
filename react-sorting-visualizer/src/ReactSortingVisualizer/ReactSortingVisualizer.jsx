import React from 'react'
import './ReactSortingVisualizer.css'
import { insertionSort } from './SrotingAlgorithms/InsertionSort'
import { selectionSort } from './SrotingAlgorithms/SelectionSort'

const MIN_NUMBER = 1
const MAX_NUMBER = 1000
const MIN_COUNT = 10
const MAX_COUNT = 135
const SCALING_FACTOR = 0.8

class ReactSortingVisualizer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            count: MAX_COUNT,
            maxBarHeight: 100,
            numbers: this.generateRandomNumbers(MAX_COUNT)
        }
    }

    componentDidMount(){
        
        // Calculating possible maximum height for bars immediatelly after a component is mounted 
        const height = window.innerHeight
        const maxHeight = height * SCALING_FACTOR
        this.setState({ maxBarHeight: maxHeight })
    }

    render() {

        const { count, maxBarHeight, numbers } = this.state
        const scaling = maxBarHeight / Math.max(...numbers)

        return (
           <div className='react-sotring-visualizer-cotainer'>

                <div className='sorting-options-cotainer'>
                    
                    <input type='range' min={MIN_COUNT} max={MAX_COUNT} value={count} onChange={this.handleCountChange}></input>

                    <button onClick={this.selectionSortHandler}>Selection Sort</button>
                    <button onClick={this.insertionSortHandler}>Insertion Sort</button>

                </div>

                <div className='random-numbers'>
                    { numbers.map((number, index) =>
                        <p key={index} className='bar' style={{ height: `${number * scaling}px`}}></p>
                    )}
                </div>

            </div> 
        );
    }

    // Function handles insertion sort button
    insertionSortHandler = () => {
        
        const { numbers } = this.state
        
        const sortedArray = insertionSort(numbers)

        this.setState({
            numbers: sortedArray
        })

    }

    // Function handles selection sort button
    selectionSortHandler = () => {

        const { numbers } = this.state

        const sortedArray = selectionSort(numbers)

        this.setState({
            numbers: sortedArray
        })

    }


    // Function handles slidebar
    handleCountChange = (event) => {

        // Getting value from range input label
        const newCount = parseInt(event.target.value, 10)

        // Generate new random array and update state
        this.setState({
            count: newCount, 
            numbers: this.generateRandomNumbers(newCount)
        })
    }
    
    // Using random number generator from 'https://www.geeksforgeeks.org/how-to-generate-random-number-in-react-js/' 
    generateRandomNumber(){
        return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    }

    // Function returns array of random numbers
    generateRandomNumbers(count){
        return Array.from({ length: count }, () => this.generateRandomNumber())
    }

    
}


export default ReactSortingVisualizer;