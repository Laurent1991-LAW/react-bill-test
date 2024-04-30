import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './component/DailyBill'


const Month = () => {

    // monthly data grouping
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY | MM'))
    }, [billList])

    // date picker visible control
    const [dateVisible, setDateVisible] = useState(false)
    
    // current date state
    const [curDt, setCurDt] = useState(
        () => {
            return dayjs().format('YYYY | MM')
        }
    )

    // handle bill list aggregation on initialization
    useEffect(() => {
        const cur = dayjs().format('YYYY | MM')
        if (monthGroup[cur]) {
            setCurrentMonthList(monthGroup[cur])
        }
    }, [monthGroup])

    // handle current month bill list aggregation
    const [currentMonthList, setCurrentMonthList] = useState([])
    const res = useMemo(() => {
        if (!currentMonthList) {
            return {
                pay: 0,
                income: 0,
                total: 0
            }
        }
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay: pay,
            income: income,
            total: pay+income
        }
    }, [currentMonthList])

    // handle daily group
    const dayBill = useMemo(() => {
        const dayGroup = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
        return {
            groupData: dayGroup,
            keys: Object.keys(dayGroup)
        }

    }, [currentMonthList])

    // confirm date pick
    const confirmDate = (date) => {
        setDateVisible(false)
        const processedDt = dayjs(date).format('YYYY | MM')
        setCurDt(processedDt)
        setCurrentMonthList(monthGroup[processedDt])
    }
    
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {curDt + ''}月账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{res.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{res.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{res.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        onCancel={() => setDateVisible(false)}
                        onClose={() => setDateVisible(false)}
                        onConfirm={ confirmDate }
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                    />
                </div>
                {
                    dayBill.keys.map(key => {
                        return <DailyBill key={key} billList={dayBill.groupData[key]} date={key} />
                    })
                }
            </div>
            
        </div >
    )
}

export default Month