import "./PerformanceInsights.css";
import { useState, useEffect } from "react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { getAll } from "../Utils/Firestore";
import { sum, totalCounter } from "../Components/Global";
export default function PerformanceInsights({ user }) {
    const [Articles, setArticles] = useState(null);
    useEffect(() => {
        getAll("Articles", user.id, "Time", "desc").then(res => setArticles(res))
    }, [user.id])
    const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function dataForPie(field) {
        let a = [];
        Articles.forEach(Element => a.push({ id: a.length, value: Element[field], label: Element.Title }))
        return a;
    }
    return (
        <div className="PerformanceInsights">
            {Articles !== null ?
                <div>
                    <div className="heading">Insights</div>
                    <div className="mainContainer">
                        <div className="setInfoContainer">
                            <div className="monthlyChart infoContainer">
                                <LineChart height={300} xAxis={[{ scaleType: 'point', data: xLabels }]} className="lineChart" series={[
                                    { data: user.Likes, label: 'Likes' },
                                    { data: user.Views, label: 'Views' },
                                ]} />
                                <div className="subHeading">Monthly Performance</div>
                            </div>
                            <div className="yearlyStats infoContainer">
                                <div className="subHeading">Yearly Performance</div>
                                <div className="yearlyStat"><div className="bold field">Articles Published</div><div> : </div><div className="value">{Articles.length}</div></div>
                                <div className="separator horizontal yearlySeparator" />
                                <div className="yearlyStat"><div className="bold field">Views</div><div> : </div><div className="value">{sum(user.Views)}</div></div>
                                <div className="separator horizontal yearlySeparator" />
                                <div className="yearlyStat"><div className="bold field">Likes</div><div> : </div><div className="value">{sum(user.Likes)}</div></div>
                                <div className="separator horizontal yearlySeparator" />
                                <div className="yearlyStat"><div className="bold field">Comments</div><div> : </div><div className="value">{sum(user.Comments)}</div></div>
                                <div className="separator horizontal yearlySeparator" />
                                <div className="yearlyStat"><div className="bold field">Shares</div><div> : </div><div className="value">{sum(user.Shares)}</div></div>
                            </div>
                        </div>
                        <div className="setInfoContainer">
                            <div className="overallPie infoContainer">
                                <PieChart height={200} series={[{
                                    data: [
                                        { id: 0, value: totalCounter(Articles, "Likes"), label: 'Likes', color: "#00aaff" },
                                        { id: 1, value: totalCounter(Articles, "CommentCount"), label: 'Comments', color: "#ff8888" },
                                        { id: 2, value: totalCounter(Articles, "Shares"), label: 'Shares', color: "#88aa00" },
                                        { id: 3, value: totalCounter(Articles, "Views") - totalCounter(Articles, "Likes") - totalCounter(Articles, "CommentCount") - totalCounter(Articles, "Shares"), color: "#aaaaaa", label: 'Remaining' },
                                    ]
                                }]} />
                                <div className="subHeading">Overall Performance</div>
                            </div>
                            <div className="monthlyBar infoContainer">
                                <BarChart height={300}
                                    xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar', "Apr"] }]}
                                    series={[{ data: user.Views, label: "Views" },{ data: user.Likes, label: "Likes" }, { data: user.Comments, label: "Comments" }, { data: user.Shares, label: "Shares" }]}
                                />
                                <div className="subHeading">Monthly Insights</div>
                            </div>
                        </div>
                        <div>
                            <div className="pies setInfoContainer">
                                <div className="piwolabel">
                                    <PieChart width={400} height={200} slotProps={{ legend: { hidden: true } }} series={[{
                                        data: dataForPie("Views")
                                    }]} />
                                    <div className="subHeading labelwolegends">Views</div>
                                </div>
                                <div className="piwolabel">
                                    <PieChart width={400} height={200} slotProps={{ legend: { hidden: true } }} series={[{
                                        data: dataForPie("Likes")
                                    }]} />
                                    <div className="subHeading labelwolegends">Likes</div>
                                </div>
                                <div className="piwolabel">
                                    <PieChart width={400} height={200} slotProps={{ legend: { hidden: true } }} series={[{
                                        data: dataForPie("CommentCount")
                                    }]} />
                                    <div className="subHeading labelwolegends">Comments</div>
                                </div>
                                <div className="piwolabel">
                                    <PieChart width={400} height={200} slotProps={{ legend: { hidden: true } }} series={[{
                                        data: dataForPie("Shares")
                                    }]} />
                                    <div className="subHeading labelwolegends">Shares</div>
                                </div>
                            </div>
                            <div className="subHeading">Article-wise Distribution</div>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}