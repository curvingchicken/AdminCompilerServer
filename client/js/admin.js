"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
$(function () {
    // タブ切り替え
    $('.nav-content').on('click', function () {
        var bind = this.dataset.bind;
        $('.nav-content.selected').removeClass('selected');
        this.classList.add('selected');
        $('.content.show').removeClass('show');
        $(".tab-" + bind).addClass('show');
        // 高さ更新
        heightRefresh();
    });
    // タブのハンバーガー化
    $('#nav-show').on('click', function () {
        $('.navigation').removeClass('hide');
        $('.navigation').addClass('show');
    });
    $('#nav-hide').on('click', function () {
        $('.navigation').removeClass('show');
        $('.navigation').addClass('hide');
    });
    // レスポンシブ
    if (matchMedia('(max-width: 480px)').matches) {
        $('.navigation').addClass('hide');
    }
    else {
        $('.navigation').addClass('show');
    }
    // コンソール
    $('#console').terminal(function (command) {
        if (command) {
            try {
                evalCommand(command, this);
            }
            catch (err) {
                this.error(err);
            }
        }
    }, {
        greetings: 'Welcome to Laze Admin Console',
    });
    // オーバーレイ
    $('.button-overlay').on('click', function () {
        var overlay = this.dataset.overlay;
        $(".overlay-" + overlay).addClass('show');
    });
    $('.overlay-window').on('click', function () {
        this.classList.remove('show');
    });
    $('.overlay-content').on('click', function () { return false; });
    $('.overlay-close').on('click', function () {
        var _a;
        (_a = this.closest('.overlay-window')) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
    });
    // フィルター
    var filterTimer;
    var filter = {
        keyword: [],
        category: [],
        server: [],
        before: undefined,
        after: undefined
    };
    $('#log-filter-box').on('input', function () {
        if (filterTimer)
            clearTimeout(filterTimer);
        filterTimer = setTimeout(function () {
            var _a;
            var filterString = ((_a = $('#log-filter-box').val()) === null || _a === void 0 ? void 0 : _a.toString()) || '';
            filter = (function () {
                var _a;
                var result = {
                    keyword: [],
                    category: [],
                    server: [],
                    before: undefined,
                    after: undefined
                };
                var selectors = (_a = filterString.match(/"(\\["]|[^"])*"|[^\s]+/g)) === null || _a === void 0 ? void 0 : _a.map(function (selector) { return selector.replace(/^"(.*)"$/, '$1'); });
                if (!selectors)
                    return result;
                selectors.forEach(function (selector) {
                    var _a;
                    var unEscape = function (str) { return str.replace('\\#', '#').replace('\\@', '@').replace('\\~', '~').replace('\\*', '*').replace('\\\\', '\\'); };
                    var getKey = function (obj, keyword) {
                        return Object.keys(obj).reduce(function (r, key) {
                            return obj[key] === keyword ? key : r;
                        }, null);
                    };
                    var getLastDate = function (date) {
                        if (date.match(/^\d\d\d\d$/)) {
                            // 年
                            return moment(date).add(1, 'year');
                        }
                        else if (date.match(/^\d\d\d\d\-\d\d$/)) {
                            // 月
                            return moment(date).add(1, 'month');
                        }
                        else if (date.match(/^\d\d\d\d\-\d\d\-\d\d$/)) {
                            // 日
                            return moment(date).add(1, 'day');
                        }
                        else if (date.match(/^\d\d\d\d\-\d\d\-\d\dT\d\d$/)) {
                            // 時
                            return moment(date).add(1, 'hour');
                        }
                        else if (date.match(/^\d\d\d\d\-\d\d\-\d\dT\d\d:\d\d$/)) {
                            // 分
                            return moment(date).add(1, 'minute');
                        }
                        else if (date.match(/^\d\d\d\d\-\d\d\-\d\dT\d\d:\d\d:\d\d$/)) {
                            // 秒
                            return moment(date).add(1, 'second');
                        }
                    };
                    if (selector.startsWith('*')) {
                        var server = (function () {
                            var server = unEscape(selector.substr(1));
                            return getKey(servers, server) || server;
                        })();
                        result.server.push(server);
                    }
                    else if (selector.startsWith('#')) {
                        var category = (function () {
                            var category = unEscape(selector.substr(1));
                            return getKey(categorys, category) || category;
                        })();
                        result.category.push(category);
                    }
                    else if (selector.startsWith('@')) {
                        var _b = (function () {
                            var _a;
                            var during = unescape(selector.substr(1));
                            var before = moment(during).unix() * 1000;
                            var after = (((_a = getLastDate(during)) === null || _a === void 0 ? void 0 : _a.unix()) || 0) * 1000;
                            return { before: before, after: after };
                        })(), before = _b.before, after = _b.after;
                        result.before = before;
                        result.after = after;
                    }
                    else if (selector.match(/(.+[^\\])~(.+)/)) {
                        var before = (selector.match(/(.+[^\\])~(.+)/) || [,])[1] || '';
                        var after = (selector.match(/(.+[^\\])~(.+)/) || [, ,])[2] || '';
                        result.before = moment(before).unix() * 1000;
                        result.after = (((_a = getLastDate(after)) === null || _a === void 0 ? void 0 : _a.unix()) || 0) * 1000;
                    }
                    else {
                        result.keyword.push(unEscape(selector));
                    }
                });
                return result;
            })();
            $('#server-log > tbody').html('');
            getLogs();
            // 読み込み中
            var labelHeight = $('#server-log').parent().find('.label').height() || 0;
            var controlHeight = $('#server-log').parent().find('.control').height() || 0;
            var loading = $('#server-log ~ .loading-div');
            loading.css({
                'top': labelHeight + 40 + "px",
                'height': ($(window).height() || 0) - labelHeight - controlHeight - 40 + "px"
            });
            loading.addClass('show');
        }, 200);
    });
    var linesPerPage = 50;
    var logMax = 1000000;
    var getLogs = function () {
        var currentLogs = $('#server-log tbody .log-main').length;
        if (logMax <= currentLogs / 2)
            return;
        socket.emit('logGet', {
            from: currentLogs + 1,
            until: currentLogs + linesPerPage,
            filter: filter,
        });
    };
    getLogs();
    socket.on('logReturn', function (log) {
        console.log(log);
        parseServerLog(log.value);
        $('#server-log ~ .loading-div').removeClass('show');
        logMax = log.max;
    });
    // 無限スクロール
    $('#server-log tbody').on('scroll', function () {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight - 10) {
            getLogs();
        }
    });
    // レイアウト
    var heightRefresh = function () {
        var _a, _b, _c;
        var tables = $('.list-tab > .table');
        for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            var tbody = table.getElementsByTagName('tbody')[0];
            var labelHeight = ((_a = table.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('label')[0].scrollHeight) || 0;
            var controlHeight = ((_c = (_b = table.parentElement) === null || _b === void 0 ? void 0 : _b.getElementsByClassName('control')[0]) === null || _c === void 0 ? void 0 : _c.scrollHeight) || 0;
            table.style.maxHeight = ($(window).height() || 0) - labelHeight - controlHeight + "px";
            tbody.style.maxHeight = ($(window).height() || 0) - labelHeight - controlHeight - 40 + "px";
        }
    };
    $(window).on('resize', heightRefresh).trigger('resize');
    document.querySelectorAll('.label').forEach(function (label) {
        new ResizeObserver(heightRefresh).observe(label);
    });
    // submit無効化
    $('.disable-submit').on('submit', function () { return false; });
    // ユーザーの一覧を取得→反映
    socket.emit('usersGet');
    socket.on('usersReturn', function (users) {
        parseUsers(users.value);
    });
    // banIP一覧取得→反映
    socket.emit('blacklistGet');
    socket.on('blacklistReturn', function (blacklist) {
        parseBanIP(blacklist.value.map(function (ip) { return { ip: ip, memo: '', timestamp: 0 }; }));
    });
    // banIP追加
    $('#add-ban-ip').on('submit', function () {
        var _a;
        var banIP = (_a = $('#ban-ip-box').val()) === null || _a === void 0 ? void 0 : _a.toString();
        if (!banIP)
            return false;
        if (banIP.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
            // IPv4
            socket.emit('blacklistAdd', {
                value: "::ffff:" + banIP
            });
            setTimeout(banIPRefresh, 500);
            $('#ban-ip-box').val('');
        }
        else if (banIP.match(/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/)) {
            // IPv6
            socket.emit('blacklistAdd', {
                value: banIP
            });
            setTimeout(banIPRefresh, 500);
            $('#ban-ip-box').val('');
        }
        else {
            popupMessage('IPアドレスの形式が有効ではありません', 'err');
        }
        return false;
    });
    // リストリフレッシュ
    var usersRefresh = function () {
        $('#users > tbody').html('');
        socket.emit('usersGet');
    };
    $('#users-refresh').on('click', usersRefresh);
    var banIPRefresh = function () {
        $('#ban-ip > tbody').html('');
        socket.emit('blacklistGet');
    };
    $('#ban-ip-refresh').on('click', banIPRefresh);
    // モニター
    var chartData = {
        CPU: 0,
        Memory: 0,
        NetworkUp: 0,
        NetworkDown: 0,
        DiskRead: 0,
        DiskWrite: 0,
    };
    var colors = {
        cpu: '17, 125, 187',
        memory: '139, 18, 174',
        network: '167, 79, 1',
        disk: '77, 166, 12'
    };
    var monitorDatasets = {
        cpu: [{
                label: 'CPU',
                borderColor: "rgb(" + colors.cpu + ")",
                backgroundColor: "rgba(" + colors.cpu + ", .1)",
                data: []
            }],
        memory: [{
                label: 'Memory',
                borderColor: "rgb(" + colors.memory + ")",
                backgroundColor: "rgba(" + colors.memory + ", .1)",
                data: []
            }],
        network: [{
                label: 'NetworkUp',
                borderColor: "rgb(" + colors.network + ")",
                backgroundColor: "rgba(" + colors.network + ", .1)",
                data: []
            }, {
                label: 'NetworkDown',
                borderColor: "rgb(" + colors.network + ")",
                backgroundColor: "rgba(" + colors.network + ", .1)",
                borderDash: [5, 5],
                data: []
            }],
        disk: [{
                label: 'DiskRead',
                borderColor: "rgb(" + colors.disk + ")",
                backgroundColor: "rgba(" + colors.disk + ", .1)",
                data: []
            }, {
                label: 'DiskWrite',
                borderColor: "rgb(" + colors.disk + ")",
                backgroundColor: "rgba(" + colors.disk + ", .1)",
                borderDash: [5, 5],
                data: []
            }],
    };
    var monitors = document.querySelectorAll('.chart-div > canvas');
    for (var i = 0; i < monitors.length; i++) {
        var monitor = monitors[i];
        var ctx = monitor.getContext('2d');
        var id = (monitor.id.match(/monitor\-(\w+)/) || [,])[1];
        if (ctx && id) {
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    // @ts-ignore
                    datasets: monitorDatasets[id]
                },
                options: {
                    scales: {
                        xAxes: [{
                                type: 'realtime',
                                // @ts-ignore
                                realtime: {
                                    duration: 30000,
                                    refresh: 1000,
                                    delay: 1000,
                                    frameRate: 30,
                                    onRefresh: function (chart) {
                                        // @ts-ignore
                                        var datasets = chart.data.datasets;
                                        if (datasets) {
                                            datasets.forEach(function (dataset) {
                                                // @ts-ignore
                                                dataset.data.push({
                                                    x: Date.now(),
                                                    // @ts-ignore
                                                    y: chartData[dataset.label],
                                                });
                                            });
                                        }
                                    }
                                },
                                display: false
                            }],
                        yAxes: [{
                                ticks: {
                                    suggestedMin: ['network', 'disk'].includes(id) ? undefined : 0,
                                    suggestedMax: ['network', 'disk'].includes(id) ? undefined : 100,
                                    stepSize: ['network', 'disk'].includes(id) ? undefined : 20,
                                    maxTicksLimit: ['network', 'disk'].includes(id) ? 5 : undefined,
                                    beginAtZero: true,
                                    padding: 10
                                },
                                gridLines: {
                                    display: true,
                                    color: 'rgb(230, 230, 230)',
                                    drawBorder: false,
                                    lineWidth: 1,
                                }
                            }]
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    hover: {
                        mode: undefined
                    },
                    elements: {
                        point: {
                            radius: 0
                        },
                        line: {
                            tension: 0,
                            borderWidth: 1
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }
    var SI = function (number) {
        if (number < 1000) {
            return number.toFixed(1);
        }
        else if (number < Math.pow(1000, 2)) {
            return (number / 1000).toFixed(1) + "K";
        }
        else if (number < Math.pow(1000, 3)) {
            return (number / Math.pow(1000, 2)).toFixed(1) + "M";
        }
        else {
            return (number / Math.pow(1000, 3)).toFixed(1) + "G";
        }
    };
    socket.on('cpu-usage', function (usage) {
        chartData.CPU = usage.percentage;
        $('#cpu-rate').text(usage.percentage.toFixed(1));
    });
    socket.on('memory-usage', function (usage) {
        chartData.Memory = usage.percentage;
        $('#memory-rate').text(usage.percentage.toFixed(1));
        $('#memory-using').text((usage.using / 1000000).toFixed(0));
        $('#memory-total').text((usage.total / 1000000).toFixed(0));
    });
    socket.on('network-usage', function (usage) {
        var transmitted = usage.transmitted || 0;
        var received = usage.received || 0;
        chartData.NetworkUp = transmitted / 1000;
        chartData.NetworkDown = received / 1000;
        $('#network-up-rate').text(SI(transmitted));
        $('#network-down-rate').text(SI(received));
    });
    socket.on('disk-usage', function (usage) {
        var read = usage.read || 0;
        var write = usage.write || 0;
        chartData.DiskRead = read / 1000;
        chartData.DiskWrite = write / 1000;
        $('#disk-read-rate').text(SI(read));
        $('#disk-write-rate').text(SI(write));
    });
    $('#log-fold-all').on('click', function () {
        $('.log-main').removeClass('show');
        $('.log-detail').css('height', 0);
    });
    $('#log-unfold-all').on('click', function () {
        $('.log-main').addClass('show');
        $('.log-detail').css('height', 'auto');
    });
});
// @ts-ignore
var socket = io.connect('', {
    'reconnection': true,
    'reconnectionDelay': 10000,
    'reconnectionDelayMax': 60000,
    'reconnectionAttempts': 10,
});
socket.on('connect_error', function () {
    popupMessage('ソケットに接続できません\n再接続を試みています...', 'err');
});
socket.on('disconnect', function () {
    popupMessage('ソケットが切断されました\n再接続を試みています...', 'err');
});
function evalCommand(cmd, terminal) {
    return __awaiter(this, void 0, void 0, function () {
        function receiveResult(result) {
            if (result.success) {
                terminal.echo(result.result).resume();
            }
            else {
                terminal.error(result.result).resume();
            }
            socket.removeListener('result', receiveResult);
        }
        return __generator(this, function (_a) {
            terminal.pause();
            socket.emit('command', {
                command: cmd
            });
            socket.on('result', receiveResult);
            return [2 /*return*/];
        });
    });
}
var categorys = {
    info: '情報',
    warn: '警告',
    error: 'エラー',
};
var servers = {
    main: 'メイン',
    admin: '管理者',
};
var resolveCategory = function (category) { return categorys[category] || ''; };
var resolveServer = function (server) { return servers[server] || ''; };
var escapeLog = function (log) { return log.join('').replace(/\<br\>/g, '\n').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\n/g, '<br>'); };
var serverLogAdd = function (log, first) {
    if (first === void 0) { first = false; }
    if (typeof log.value === 'undefined') {
        console.error('log.value undefined detected', log);
    }
    var tr = "<tr class=\"log-main\"><td class=\"" + log.server + "\">" + resolveServer(log.server) + "</td><td class=\"" + log.category + "\">" + resolveCategory(log.category) + "</td><td>" + log.title + "</td><td>" + moment(new Date(log.timestamp)).format('YYYY/MM/DD HH:mm:ss') + "</td></tr><tr class=\"log-detail\"><td>" + escapeLog(log.value) + "</td></tr>";
    var logLine = (function () {
        if (first) {
            $('#server-log > tbody').prepend(tr);
            return $('#server-log > tbody > .log-main')[0];
        }
        else {
            $('#server-log > tbody').append(tr);
            return $('#server-log > tbody > .log-main').slice(-1)[0];
        }
    })();
    $(logLine).on('click', function () {
        if (this.classList.contains('show')) {
            this.classList.remove('show');
            $(this).next().animate({ height: 0 }, 100);
        }
        else {
            this.classList.add('show');
            var autoHeight = $(this).next().css('height', 'auto').height();
            $(this).next().height(0).animate({ height: autoHeight }, 100);
        }
    });
};
function parseServerLog(logs) {
    logs.forEach(function (log) { return serverLogAdd(log); });
}
socket.on('newLog', function (result) {
    var logs = result.value;
    console.log(logs);
    logs.forEach(function (log) {
        serverLogAdd(log, true);
    });
});
function parseBanIP(banIPs) {
    banIPs.forEach(function (banIP) {
        $('#ban-ip > tbody').append("<tr><td>" + banIP.ip + "</td><td>" + banIP.memo + "</td><td>" + moment(new Date(banIP.timestamp)).format('YYYY/MM/DD HH:mm:ss') + "</td><td><button class=\"btn btn-outline-secondary ban-ip-edit\"><i class=\"bi bi-pencil\"></i></button><button class=\"btn btn-outline-secondary ban-ip-remove\"><i class=\"bi bi-x\"></i></button></td></tr>");
    });
    // banIP編集
    $('.ban-ip-edit').on('click', function () {
    });
    // banIP削除
    $('.ban-ip-remove').on('click', function () {
        var banIP = $(this).parents('tr').find('td:first-child').text();
        socket.emit('blacklistRemove', {
            value: banIP
        });
        setTimeout(function () {
            $('#ban-ip > tbody').html('');
            socket.emit('blacklistGet');
        }, 500);
    });
}
function parseUsers(users) {
    users.forEach(function (user) {
        $('#users > tbody').append("<tr><td><img src=\"/avatar/id?id=" + user.id + "\"></td><td>" + user.id + "</td><td>" + user.username + "</td><td>" + user.email + "</td><td><button class=\"btn btn-outline-secondary edit\"><i class=\"bi bi-pencil\"></i></button><button class=\"btn btn-outline-secondary remove\"><i class=\"bi bi-x\"></i></button></td></tr>");
    });
}
function popupMessage(value, style) {
    var _a, _b;
    if (style === void 0) { style = 'info'; }
    $('#overlay-popup').append("<div class=\"popup-message " + style + "\"><span>" + escapeLog([value]) + "</span><button><svg viewBox=\"0 0 64 64\"><use xlink:href=\"assets/icons/icons.svg#cross\"></use></svg></button></div>");
    (_a = document.querySelector('#overlay-popup .popup-message:last-of-type')) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', function (e) {
        // @ts-ignore
        if (e.animationName.startsWith('popup-end'))
            this.remove();
    });
    (_b = document.querySelector('#overlay-popup .popup-message:last-of-type')) === null || _b === void 0 ? void 0 : _b.addEventListener('animationstart', function (e) {
        // @ts-ignore
        if (e.animationName.startsWith('popup-end'))
            $(this).animate({ height: 0, padding: '0 10px' }, 500);
    });
    // @ts-ignore
    document.querySelector('#overlay-popup .popup-message:last-of-type button').onclick = function () {
        var _a;
        (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('close');
    };
}
