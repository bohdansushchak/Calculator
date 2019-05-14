import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


export default class MainScreen extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        let rows = [];
        const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
        for (let i = 0; i < nums.length; i++) {
            let row = [];
            for (let j = 0; j < nums[i].length; j++) {
                row.push(<TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>{nums[i][j]}</Text>
                </TouchableOpacity>)
            }
            rows.push(<View style={styles.rowButtons}>{row}</View>);
        }

        const operation = ['÷', '×', '-', '+'];
        let ops = [];
        for (let i = 0; i < operation.length; i++) {
            ops.push(<TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>{operation[i]}</Text>
            </TouchableOpacity>);
        }

        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>11*22</Text></View>
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
        backgroundColor: 'blue'
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
    },
    btnText: {
        fontSize: 25,
    }
});