;(function() {

        'use strict';

        //_______  The format of date: 'year.month.day' (2016.07.21)

        var data = [
            {
                name: 'Task 1',
                aims: [
                    {
                        caption: 'a',
                        from: '2016.12.10',
                        to: '2016.12.13'
                    },
                    {
                        caption: 'b',
                        from: '2016.12.14',
                        to: '2016.12.21'
                    }
                ]
            },
            {
                name: 'Task 2',
                aims: [
                    {
                        caption: 'c',
                        from: '2016.12.14',
                        to: '2016.12.16'
                    },
                    {
                        caption: 'd',
                        from: '2016.12.17',
                        to: '2016.12.22'
                    },
                    {
                        caption: 'e',
                        from: '2016.12.23',
                        to: '2016.12.27'
                    }
                ]
            },
            {
                name: 'Task 3',
                aims: [
                    {
                        caption: 'f',
                        from: '2016.12.28',
                        to: '2017.01.02'
                    }
                ]
            },
            {
                name: 'Task 4',
                aims: [
                    {
                        caption: 'g',
                        from: '2016.12.28',
                        to: '2017.01.05'
                    },
                    {
                        caption: 'h',
                        from: '2017.01.06',
                        to: '2017.01.09'
                    }
                ]
            },
            {
                name: 'Task 5',
                aims: [
                    {
                        caption: 'i',
                        from: '2017.01.10',
                        to: '2017.01.12'
                    },
                    {
                        caption: 'j',
                        from: '2017.01.13',
                        to: '2017.01.20'
                    },
                    {
                        caption: 'k',
                        from: '2017.01.21',
                        to: '2017.01.24'
                    }
                ]
            },
            {
                name: 'Task 6',
                aims: [
                    {
                        caption: 'l',
                        from: '2016.12.10',
                        to: '2017.01.24'
                    }
                ]
            }
        ];

        //var json = JSON.stringify(data);
        //console.log(json);

        (function() {
            checkData();
            var minDate = findMinDate();
            var maxDate = findMaxDate();
            var timeInterval = getTimeInterval(minDate, maxDate);
            buildDiagram(timeInterval, false);
            document.getElementById('showGroups').addEventListener('click', buildDiagram.bind(null, timeInterval, false, false));
            document.getElementById('hideGroups').addEventListener('click', buildDiagram.bind(null, timeInterval, true, false));
            document.getElementById('x7showGroups').addEventListener('click', buildDiagram.bind(null, timeInterval, false, true));
            document.getElementById('x7hideGroups').addEventListener('click', buildDiagram.bind(null, timeInterval, true, true));
        })()

        function checkData() {
            data.forEach((elem) => {
                if(!elem.name || (elem.aims.length == 0)) {
                    alert('The data is wrong. Check it');
                    throw new Error('The data is wrong. Check it');
                }
                elem.aims.forEach((props) => {
                    if(!props.caption || !props.from || !props.to) {
                        alert('The data is wrong. Check it');
                        throw new Error('The data is wrong. Check it');
                    }
                });
            });
        }

        function findMinDate() {
            var minDate = '9999.99.99';
            var dates = [];

            data.forEach((elem) => {
                elem.aims.forEach((aim) => {dates.push(aim.from)});
            });

            dates.forEach((elem) => {
                if(elem < minDate) {
                    minDate = elem;
                }
            });

            return minDate;
        }

        function findMaxDate() {
            var maxDate = '0000.00.00';
            var dates = [];

            data.forEach((elem) => {
                elem.aims.forEach((aim) => {dates.push(aim.to)});
            });

            dates.forEach((elem) => {
                if(elem > maxDate) {
                    maxDate = elem;
                }
            });

            return maxDate;
        }

        function getTimeInterval(min, max) {

            var minYear = parseInt(min.match(/\d{2,4}/g)[0]);
            var minMonth = min.match(/\d{2,4}/g)[1] - 1;
            var minDay = parseInt(min.match(/\d+$/g));
            var maxYear = parseInt(max.match(/\d{2,4}/g)[0]);
            var maxMonth = max.match(/\d{2,4}/g)[1] - 1;
            var maxDay = parseInt(max.match(/\d+$/g));

            var startDate = new Date(minYear, minMonth, minDay);
            var endDate = new Date(maxYear, maxMonth, maxDay);
            var weeks = [];
            var week = [];

            if(startDate.getDay() != 0) {
                while(startDate.getDay() != 0) {
                    startDate.setDate(startDate.getDate() - 1);
                }
            }

            if(endDate.getDay() != 6) {
                while(endDate.getDay() != 6) {
                    endDate.setDate(endDate.getDate() + 1);
                }
            }

            var startLoop = `${startDate.getFullYear()}.${Math.floor((startDate.getMonth() + 1) / 10)}${(startDate.getMonth() + 1) % 10}.${Math.floor(startDate.getDate() / 10)}${startDate.getDate() % 10}`;
            var endLoop = `${endDate.getFullYear()}.${Math.floor((endDate.getMonth() + 1) / 10)}${(endDate.getMonth() + 1) % 10}.${Math.floor(endDate.getDate() / 10)}${endDate.getDate() % 10}`;

            while(startLoop <= endLoop) {
                if(startDate.getDay() == 6) {
                    week.push(`${startDate.getFullYear()}.${Math.floor((startDate.getMonth() + 1) / 10)}${(startDate.getMonth() + 1) % 10}.${Math.floor(startDate.getDate() / 10)}${startDate.getDate() % 10}`);
                    weeks.push(week);
                    week = [];
                    startDate.setDate(startDate.getDate() + 1);
                    startLoop = `${startDate.getFullYear()}.${Math.floor((startDate.getMonth() + 1) / 10)}${(startDate.getMonth() + 1) % 10}.${Math.floor(startDate.getDate() / 10)}${startDate.getDate() % 10}`;
                } else {
                    week.push(`${startDate.getFullYear()}.${Math.floor((startDate.getMonth() + 1) / 10)}${(startDate.getMonth() + 1) % 10}.${Math.floor(startDate.getDate() / 10)}${startDate.getDate() % 10}`);
                    startDate.setDate(startDate.getDate() + 1);
                    startLoop = `${startDate.getFullYear()}.${Math.floor((startDate.getMonth() + 1) / 10)}${(startDate.getMonth() + 1) % 10}.${Math.floor(startDate.getDate() / 10)}${startDate.getDate() % 10}`;
                }
            }

            return weeks;
        }

        function buildDiagram(tI, hideGroups, scale) {
            var diagram = document.querySelector('.diagram');
            var description = document.querySelector('.description');
            diagram.innerHTML = '';
            description.innerHTML = '';
            var colors = ['#1abc9c', '#2ecc71', '#4aa3df', '#9b59b6', '#34495e', '#e67e22', '#e74c3c'];
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var calendar = document.createElement('div');

            //_______ Calendar

            if(!scale) {
                calendar.className = 'calendar';

                tI.forEach((week) => {
                    var calendarWeek = document.createElement('div');
                    calendarWeek.className = 'calendar_week';
                    calendarWeek.textContent = `${months[(week[0].match(/\d{2,4}/g)[1] - 1)]} ${week[0].match(/\d+$/g)}`;
                    calendar.appendChild(calendarWeek);
                });

            } else {
                calendar.className = 'calendar_scale';

                tI.forEach((week) => {
                    week.forEach((day) => {
                        var calendarDay = document.createElement('div');
                        calendarDay.className = 'calendar_day';
                        calendarDay.textContent = `${months[(day.match(/\d{2,4}/g)[1] - 1)]} ${day.match(/\d+$/g)}`;
                        calendar.appendChild(calendarDay);
                    });
                });

            }


            data.forEach((elem) => {
                var name = document.createElement('div');
                name.textContent = elem.name;
                name.className = 'name';
                var line = document.createElement('div');
                line.className = 'line';
                line.appendChild(name);
                var aimsIntervals = [];
                var colorsMatchArray = [];
                var colorsMatch = false;

                //_______ Choose colors

                elem.aims.forEach((aI, i) => {
                    var color = colors[getRandomInteger(0, colors.length - 1)];
                    colorsMatch = colorsMatchArray.includes(color);
                    if(colorsMatch == true) {
                        while(colorsMatch == true) {
                            color = colors[getRandomInteger(0, colors.length - 1)];
                            colorsMatch = colorsMatchArray.includes(color);
                        }
                    }
                    colorsMatchArray.push(color);
                    aimsIntervals.push([aI.from, aI.to, colorsMatchArray[i], aI.caption]);
                });

                //_______ Add description

                if(!hideGroups) {
                    aimsIntervals.forEach((aIEntry) => {
                        var div = document.createElement('div');
                        var descName = document.createElement('span');
                        descName.textContent = `${elem.name} `;
                        var square = document.createElement('div');
                        square.className = 'square';
                        square.style.backgroundColor = aIEntry[2];
                        var span = document.createElement('span');
                        span.textContent = ` - ${aIEntry[3]}`;
                        div.appendChild(descName);
                        div.appendChild(square);
                        div.appendChild(span);
                        description.appendChild(div);
                    });
                }

                //_______ Draw diagram

                if(!scale) {

                    tI.forEach((weeks) => {
                        var week = document.createElement('div');
                        week.className = 'week';
                        var separator = document.createElement('div');
                        separator.className = 'separator';

                        weeks.forEach((days) => {
                            var day = document.createElement('div');
                            day.className = 'day';
                            var indicator = document.createElement('div');
                            indicator.className = 'indicator';

                            aimsIntervals.forEach((aIEntry) => {
                                if((days >= aIEntry[0]) && (days <= aIEntry[1])) {
                                    if(!hideGroups) {
                                        indicator.style.backgroundColor = aIEntry[2];
                                    } else {
                                        indicator.style.backgroundColor = '#1abc9c';
                                    }
                                }
                            });

                            day.appendChild(indicator);
                            week.appendChild(day);
                        });

                        line.appendChild(separator);
                        line.appendChild(week);
                    });

                } else {

                    tI.forEach((weeks) => {

                        weeks.forEach((days) => {
                            var dayScale = document.createElement('div');
                            dayScale.className = 'day_scale';
                            var indicatorScale = document.createElement('div');
                            indicatorScale.className = 'indicator_scale';
                            var separator = document.createElement('div');
                            separator.className = 'separator';

                            aimsIntervals.forEach((aIEntry) => {
                                if((days >= aIEntry[0]) && (days <= aIEntry[1])) {
                                    if(!hideGroups) {
                                        indicatorScale.style.backgroundColor = aIEntry[2];
                                    } else {
                                        indicatorScale.style.backgroundColor = '#1abc9c';
                                    }
                                }
                            });

                            dayScale.appendChild(indicatorScale);
                            line.appendChild(separator);
                            line.appendChild(dayScale);
                        });

                    });

                }

                diagram.appendChild(line);
            });

            diagram.appendChild(calendar);
        }

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
})()
