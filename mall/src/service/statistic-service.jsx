import {method} from "../util";

class StatisticService {
    getHomeCount(){
        return method.request({
            url: 'manage/statistic/base_count.do'
        })
    }

}

export const statistic = new StatisticService()
