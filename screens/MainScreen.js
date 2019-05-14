import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


const OPERATION = ['c', '÷', '×', '-', '+'];
const NUMS = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']];

export default class MainScreen extends Component {
    constructor() {
        super();
        this.state = {
            resultText: ""
        };
        this.resultText = "";
    }


    calculateResult() {
        const text = this.state.resultText;
    }

    buttonPressed(text) {


        if (text == '=') return this.calculateResult();

        this.setState({
            resultText: this.state.resultText + text
        })

    }

    operate(operation) {
        switch (operation) {
            case 'c':
                let { resultText } = this.state;

                if (resultText && resultText !== '') {
                    let text = resultText.split('');
                    text.pop();
                    let newText = text.join('');
                    console.log("newText", newText);
                    this.setState({
                        resultText: newText
                    })
                    return;
                }
            case '+':
            case '-':
            case '÷':
            case '×':
                const lastChar = this.state.resultText.split('').pop();
                if (OPERATION.indexOf(lastChar) > 0) {
                    return
                }

                if (this.state.resultText == '') return
                this.setState({ resultText: this.state.resultText + operation })
        }
    }

    render() {
        let rows = [];
        for (let i = 0; i < NUMS.length; i++) {
            let row = [];
            for (let j = 0; j < NUMS[i].length; j++) {
                row.push(<TouchableOpacity onPress={() => this.buttonPressed(NUMS[i][j])} style={styles.btn}>
                    <Text style={styles.btnText}>{NUMS[i][j]}</Text>
                </TouchableOpacity>)
            }
            rows.push(<View style={styles.rowButtons}>{row}</View>);
        }

        let ops = [];
        for (let i = 0; i < OPERATION.length; i++) {
            ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(OPERATION[i])}>
                <Text style={styles.btnText} >{OPERATION[i]}</Text>
            </TouchableOpacity>);
        }

        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{this.state.resultText}</Text></View>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>5544</Text></View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operation}>{ops}</View>
                </View>

            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    result: {
        flex: 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    calculation: {
        flex: 1,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    buttons: {
        flex: 7,
        flexDirection: 'row'
    },
    numbers: {
        flex: 3,
        backgroundColor: 'yellow',
        justifyContent: "space-around",
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    operation: {
        flex: 1,
        backgroundColor: 'blue',
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    resultText: {
        fontSize: 30,
        color: "black"
    },
    calculationText: {
        fontSize: 24,
        color: "white"
    },
    rowButtons: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'stretch',
        flex: 1
    },
    btn: {
        margin: 5,
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    btnText: {
        fontSize: 25,
    }
});