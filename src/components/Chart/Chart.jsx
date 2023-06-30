import React, { memo, useEffect, useState } from 'react';
import './chart.css';
import * as echarts from 'echarts';
import { countingTheRating } from '../../utils/utils';

const Chart = memo(({ productInfo }) => {
    const [uniqueCount, setUniqueCount] = useState(0);
    const [theMostLiked, setTheMostLiked] = useState(0);
    const [theMostRewiews, setTheMostRewiews] = useState(0);

    useEffect(() => {
        setTheMostLiked(productInfo.likes?.length);
        setTheMostRewiews(productInfo.reviews?.length);
        setUniqueCount(countingTheRating(productInfo));
    }, [productInfo]);

    useEffect(() => {
        const chartDom = document.getElementById('chartRating');
        const myChart = echarts.init(chartDom);

        window.addEventListener('resize', function () {
            myChart.resize();
        });

        const option = {
            title: {
                text: 'Информация о рейтинге продукте',
                subtext: 'Все оценки продукта',
                left: 'right',
            },
            tooltip: {
                trigger: 'item',
            },
            yAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5'],
            },
            xAxis: {
                type: 'value',
                splitNumber: 5,
                minInterval: 1,
            },
            series: [
                {
                    data: uniqueCount,
                    type: 'bar',
                    barWidth: 25,
                    color: '#ffe44d',
                },
            ],
        };

        option && myChart.setOption(option);
    }, [uniqueCount]);

    useEffect(() => {
        const chartDom = document.getElementById('chartId');
        const myChart = echarts.init(chartDom);

        window.addEventListener('resize', function () {
            myChart.resize();
        });

        const optionReviews = {
            title: {
                text: 'Отзывы и лайки продукта',
                subtext: 'Соотношение комментариев и лайков',
                left: 'right',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                bottom: 'bottom',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: theMostLiked, name: 'Все лайки продута', color: 'red' },
                        { value: theMostRewiews, name: 'Все отзывы продута' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };

        optionReviews && myChart.setOption(optionReviews);
    }, [theMostLiked, theMostRewiews]);

    return (
        <div className='chart__container'>
            <div id='chartId' className='chart'></div>
            <div id='chartRating' className='chart'></div>
        </div>
    );
});

export default Chart;
