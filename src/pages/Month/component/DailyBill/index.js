import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/constant/index'
import Icon from '@/static/Icon'

const DailyBill = ({ billList, date }) => {

    const res = useMemo(() => {
        if (!billList) {
            return {
                pay: 0,
                income: 0,
                total: 0
            }
        }
        const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay: pay,
            income: income,
            total: pay + income
        }
    }, [billList])

    const[visible, setVisible] = useState(true)

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span
                        onClick={() => setVisible(!visible)}
                        className={classNames('arrow', !visible && 'expand')}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{res.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{res.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{res.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList" style={{display: visible ? 'block' : 'none'}}>
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <Icon type={ item.useFor } />
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill