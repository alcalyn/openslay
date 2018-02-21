import React, { Component } from 'react';

export default class Selection extends Component {
    buyUnit() {
        try {
            this.props.arbiter.buyUnit();

            if (this.props.onUpdate) {
                this.props.onUpdate();
            }
        } catch (e) {
            console.warn(e.message);
        }
    }

    buyTower() {
        try {
            this.props.arbiter.buyTower();

            if (this.props.onUpdate) {
                this.props.onUpdate();
            }
        } catch (e) {
            console.warn(e.message);
        }
    }

    getBalanceDiff(balance) {
        if (!balance) {
            return;
        }

        const diff = balance.diff();

        if (diff > 0) {
            return <span className="balance">(<span className="text-success">+{ diff }</span>)</span>;
        }

        if (diff < 0) {
            return <span className="balance">(<span className="text-danger">{ diff }</span>)</span>;
        }

        return <span className="balance">(0)</span>;
    }

    render() {
        const kingdom = this.props.arbiter.currentKingdom;

        if (!kingdom) {
            return <div></div>;
        }

        return (
            <div class="card">
                <h3 class="card-header">Kingdom menu</h3>
                <div class="card-body">
                    <h4 class="card-title">Economy</h4>

                    { kingdom.balance ? (
                        <p>
                            <small>Last capital: { kingdom.balance.lastCapital }</small><br />
                            <small>Income: +{ kingdom.balance.income }</small><br />
                            <small>Units: -{ kingdom.balance.maintenance }</small>
                        </p>
                    ) : '' }

                    <p class="h2">
                        Money: <b>{ kingdom.money }</b>
                        &nbsp;
                        { this.getBalanceDiff(kingdom.balance) }
                    </p>
                </div>
                <div class="card-body">
                    <h4 class="card-title">Military</h4>
                    <p><button class="btn btn-success" onClick={ () => { this.buyUnit(); } }>Buy Unit ($10)</button></p>
                    <p><button class="btn btn-success" onClick={ () => { this.buyTower(); } }>Buy Tower ($15)</button></p>
                </div>
            </div>
        );
    }
}
