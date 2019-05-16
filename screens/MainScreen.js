import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


const OPERATION = ['DEL', '÷', '×', '-', '+'];
const NUMS = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']];

export default class MainScreen extends Component {
    constructor() {
        super();
        this.state = {
            resultText: "",
            calculationText: ""
        };
    }

    validate() {
        const text = this.state.resultText

        switch (text.slice(-1)) {
            case '+':
            case '-':
            case '÷':
            case '×':
                return false
        }
        return true;
    }

    calculateResult() {
        let text = this.state.resultText;

        const charTab = text.split('');

        for (let i = 0; i < charTab.length; i++) {
            let char = charTab[i];
            if (char == '×')
                charTab[i] = '*';
            if (char == '÷')
                charTab[i] = '/'
        }

        text = charTab.join('');

        console.log("charTab", text);

        const calculationText = eval(text);
        this.setState({
            calculationText
        });
    }

    buttonPressed(text) {
        if (text == '=') return this.validate() && this.calculateResult();

        this.setState({
            resultText: this.state.resultText + text
        })

    }

    btnLongPress(key) {
        switch (key) {
            case '=':
                const { calculationText } = this.state;
                if (calculationText !== '') {
                    this.setState({
                        resultText: calculationText.toString(),
                        calculationText: ''
                    })
                }
                break;
        }
    }

    operateLongPress(key) {
        switch (key) {
            case 'DEL':
                this.setState({ resultText: "", calculationText: '' })
                break;


        }
    }

    operate(operation) {
        switch (operation) {
            case 'DEL':
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
            for (let j = 0; j < NUMS[i].length; j++) {//onLongPress
                let button = <TouchableOpacity onPress={() => this.buttonPressed(NUMS[i][j])}
                    key={NUMS[i][j]}
                    style={styles.btn}
                    activeOpacity={0.6}
                    onLongPress={() => this.btnLongPress(NUMS[i][j])}
                >
                    <Text style={styles.btnText}>{NUMS[i][j]}</Text>
                </TouchableOpacity>
                row.push(button)
            }
            rows.push(<View key={NUMS[i]} style={styles.rowButtons}>{row}</View>);
        }

        let ops = [];
        for (let i = 0; i < OPERATION.length; i++) {
            ops.push(<TouchableOpacity
                style={styles.btn}
                onPress={() => this.operate(OPERATION[i])}
                key={OPERATION[i]}
                activeOpacity={0.6}
                onLongPress={() => this.operateLongPress(OPERATION[i])}>
                <Text style={styles.operationText} >{OPERATION[i]}</Text>
            </TouchableOpacity>);
        }

        const { resultText, calculationText } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{resultText}</Text></View>
                <View style={styles.calculationContainer}>
                    <Text style={styles.calculationText}>{calculationText}</Text></View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operationContainer}>{ops}</View>
                </View>

            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resultContainer: {
        flex: 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    calculationContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    buttonsContainer: {
        flex: 7,
        flexDirection: 'row',
        backgroundColor: '#434343'
    },
    numbers: {
        flex: 3,
        justifyContent: "space-around",
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    operationContainer: {
        flex: 1,
        backgroundColor: '#636363',
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    resultText: {
        fontSize: 30,
        color: "black"
    },
    calculationText: {
        fontSize: 24,
        color: "black"
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
    },
    btnText: {
        fontSize: 28,
        color: 'white'
    },
    operationText: {
        fontSize: 20,
        color: 'white'
    }
});