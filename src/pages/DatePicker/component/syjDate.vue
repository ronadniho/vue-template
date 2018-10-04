<template>
  <div
    v-if="isShow"
    class="syj-date"
  >
    <div class="s-date">
      <!--action-->
      <div class="s-date-action flex-row-nowrap">
        <div class="s-date-action-prev btn">
          <button
            @click="prev"
            :class="{disabled:isDisabled&&isDisabled.key=='start'}"
          >&lt;
          </button>
        </div>
        <div class="s-date-action-current-date">{{currentYearMonth}}</div>
        <div class="s-date-action-next btn">
          <button
            @click="next"
            :class="{disabled:isDisabled&&isDisabled.key=='end'}"
          >&gt;
          </button>
        </div>
      </div>
      <!--week-->
      <div class="s-date-week flex-row-nowrap">
        <div class="s-date-week-item"
             v-for="(item,index) in week"
             :key="index">
          {{item}}
        </div>
      </div>
      <!--day-->
      <ul class="s-date-day flex-row-wrap">
        <li
          class="s-date-day-item"
          :class="{
          selected:(targetStatus=='START'&&isStartSelected&&item==getSelectStartDate)||
          (targetStatus=='END'&&isEndSelected&&item==getSelectEndDate),
          disabled:isDisabled&&
          (isDisabled.key=='start'&&item<=isDisabled.val)||
          (isDisabled.key=='end'&&item>isDisabled.val)||
          (isDisabled.key=='start-end'&&((item>isDisabled.end)||(item<=isDisabled.start)))
          ,
          }"
          v-for="(item,index) in renderData"
          :key="index"
          @click="selectDate(item,isDisabled&&
          (isDisabled.key=='start'&&item<=isDisabled.val)||
          (isDisabled.key=='end'&&item>isDisabled.val)||
          (isDisabled.key=='start-end'&&((item>isDisabled.end)||(item<=isDisabled.start))))"
        >
          {{item}}
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "syjDate",
    props: ['limit', 'isActive', 'targetStatus'],
    watch: {
      targetStatus() {
        return this.targetStatus;
      }
    },
    data() {
      return {
        week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        currentStartDate: new Date(new Date().getTime() + 24 * 3600 * 1000),
        currentEndDate: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2),

        nowDayArr: [],
        selectStartDate: new Date(new Date().getTime() + 24 * 3600 * 1000),
        selectEndDate: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2),
      }
    },
    created: function () {
      console.log(this.limit);
      this.selectStartDate = this.$store.state.search.checkIn;
      this.selectEndDate = this.$store.state.search.checkOut;

    },
    computed: {
      isShow() {
        if (this.targetStatus == 'START') {
          this.currentStartDate = this.selectStartDate;
        } else {
          this.currentEndDate = this.selectEndDate;
        }
        return this.isActive;
      },
      getSelectStartDate() {
        return this.selectStartDate.getDate();
      },
      getSelectEndDate() {
        return this.selectEndDate.getDate();
      },
      isDisabled() {
        let lmY = this.limit.min.getFullYear();
        let lmM = this.limit.min.getMonth();
        let lxY = this.limit.max.getFullYear();
        let lxM = this.limit.max.getMonth();

        let csY = this.currentStartDate.getFullYear();
        let csM = this.currentStartDate.getMonth();

        let ceY = this.currentEndDate.getFullYear();
        let ceM = this.currentEndDate.getMonth();

        let ssY = this.selectStartDate.getFullYear();
        let ssM = this.selectStartDate.getMonth();

        if (this.targetStatus == 'START') {
          if (lmY == csY && lmM == csM) {
            return {key: 'start', val: this.limit.min.getDate()};
          } else if (lxY == csY && lxM == csM) {
            let aa = new Date(this.limit.max.getTime()).getTime();
            aa = new Date(aa - 24 * 3600 * 1000).getDate();
            return {key: 'end', val: aa};
          }
        } else if (this.targetStatus == 'END') {
          if ((ceY == csY && ceM == csM) && (ceY === lxY && ceM == lxM)) {
            return {
              key: 'start-end',
              start: this.selectStartDate.getDate(),
              end: this.limit.max.getDate()
            };
          } else if (ceY == csY && ceM == csM) {
            return {key: 'start', val: this.selectStartDate.getDate()};
          } else if ((ceY == csY && ceM < csM) || (ceY < csY)) {
            return {key: 'start', val: new Date(ceY, ceM + 1, 0).getDate()};
          } else if (lxY == ceY && lxM == ceM) {
            return {key: 'end', val: this.limit.max.getDate()};
          }
          /*
           if (lmY == ceY && lmM == ceM) {
             return {key: 'start', val: this.limit.min.getDate()};
           } else if (lxY == ceY && lxM == ceM) {
             return {key: 'end', val: this.limit.max.getDate()};
           }
 */


        }
        // if (this.targetStatus == 'START') {
        //   if (lmY == csY && lmM == csM) {
        //     return {key: 'start', val: this.limit.min.getDate()};
        //   } else if (lxY == csY && lxM == csM) {
        //     return {key: 'end', val: this.limit.max.getDate()};
        //   }
        // } else if (this.targetStatus == 'END') {
        //   if (lmY == ceY && lmM == ceM) {
        //     return {key: 'start', val: this.limit.min.getDate()};
        //   } else if (lxY == ceY && lxM == ceM) {
        //     return {key: 'end', val: this.limit.max.getDate()};
        //   }
        // }


        return false;
      },
      isStartSelected() {
        let ssY = this.selectStartDate.getFullYear();
        let ssM = this.selectStartDate.getMonth();
        let csY = this.currentStartDate.getFullYear();
        let csM = this.currentStartDate.getMonth();

        if (ssY == csY && ssM == csM) {
          return true;
        } else {
          return false;
        }
      },
      isEndSelected() {
        let seY = this.selectEndDate.getFullYear();
        let seM = this.selectEndDate.getMonth();
        let ceY = this.currentEndDate.getFullYear();
        let ceM = this.currentEndDate.getMonth();
        if (seY == ceY && seM == ceM) {
          return true;
        } else {
          return false;
        }
      },

      firstDayInWeek() {
        let cY, cM;
        if (this.targetStatus == 'START') {
          cY = this.currentStartDate.getFullYear();
          cM = this.currentStartDate.getMonth();
        } else if (this.targetStatus == 'END') {
          cY = this.currentEndDate.getFullYear();
          cM = this.currentEndDate.getMonth();
        }
        let firstDay = new Date(cY, cM, 1).getDay();
        let firstDayArr = [];
        if (!firstDay) {
          return [];
        }
        for (let i = 0; i < firstDay; i++) {
          firstDayArr.push('');
        }
        return firstDayArr;
      },

      lastDayInWeek() {
        let num = 42 - this.dayCount - this.firstDayInWeek.length;
        let nextDays = [];
        if (num === 0) return nextDays;

        for (let i = 1; i <= num; i++) {
          nextDays.push('');
        }
        return nextDays;
      },

      dayCount() {
        let cY, cM;
        if (this.targetStatus == 'START') {
          cY = this.currentStartDate.getFullYear();
          cM = this.currentStartDate.getMonth() + 1;
        } else if (this.targetStatus == 'END') {
          cY = this.currentEndDate.getFullYear();
          cM = this.currentEndDate.getMonth() + 1;
        }
        let nowDay = new Date(cY, cM, 1);
        nowDay.setHours(nowDay.getHours() - 3);
        nowDay = nowDay.getDate();
        return nowDay;
      },

      renderData() {
        this.nowDayArr = [];
        for (let i = 1; i <= this.dayCount; i++) {
          this.nowDayArr.push(i);
        }
        return [...this.firstDayInWeek, ...this.nowDayArr, ...this.lastDayInWeek];
      },




      currentStartInitDay() {
        let cY = this.currentStartDate.getFullYear();
        let cM = this.currentStartDate.getMonth();
        return new Date(cY, cM, 1);
      },
      currentEndInitDay() {
        let cY = this.currentEndDate.getFullYear();
        let cM = this.currentEndDate.getMonth();
        return new Date(cY, cM, 1);
      },

      currentLimitInitDay() {
        let lmY = this.limit.min.getFullYear();
        let lmM = this.limit.min.getMonth();
        return new Date(lmY, lmM, 1);
      },
      currentLimitMaxInitDay() {
        let lmY = this.limit.max.getFullYear();
        let lmM = this.limit.max.getMonth();
        return new Date(lmY, lmM, 1);
      },
      currentYearMonth() {
        let month,year;
        if (this.targetStatus == 'START') {
          year = this.currentStartDate.getFullYear();
          month = this.currentStartDate.getMonth() + 1;
        } else {
          year = this.currentEndDate.getFullYear();
          month = this.currentEndDate.getMonth() + 1;
        }
        console.log(month);
        switch (month) {
          case 1:
            return `Jan ${year}`;
            break;
          case 2:
            return `Feb ${year}`;
            break;
          case 3:
            return `Mar ${year}`;
            break;
          case 4:
            return `Apr ${year}`;
            break;
          case 5:
            return `May ${year}`;
            break;
          case 6:
            return `Jun ${year}`;
            break;
          case 7:
            return `Jul ${year}`;
            break;
          case 8:
            return `Aug ${year}`;
            break;
          case 9:
            return `Sep ${year}`;
            break;
          case 10:
            return `Oct ${year}`;
            break;
          case 11:
            return `Nov ${year}`;
            break;
          case 12:
            return `Dec ${year}`;
            break;
        }
      },
    },
    methods: {
      //选择日期
      selectDate(val, bool) {
        if (!val || bool) {
          return;
        }
        let csY, csM, ceY, ceM;
        if (this.targetStatus == 'START') {
          console.log(Date.parse(this.selectEndDate) == Date.parse(this.selectStartDate))
          csY = this.currentStartDate.getFullYear();
          csM = this.currentStartDate.getMonth();
          this.selectStartDate = new Date(csY, csM, val);
          if (this.selectStartDate.getTime() >= this.selectEndDate.getTime()) {
            let ssD = this.selectStartDate.getTime() + 24 * 3600 * 1000;
            this.selectEndDate = new Date(ssD);
          }
          this.$store.commit('set_checkIn', this.selectStartDate);
          this.$store.commit('set_checkOut', this.selectEndDate);
          this.$emit('done', this.selectStartDate, false, this.selectEndDate);
        } else if (this.targetStatus == 'END') {
          ceY = this.currentEndDate.getFullYear();
          ceM = this.currentEndDate.getMonth();
          this.selectEndDate = new Date(ceY, ceM, val);
          if (this.selectEndDate.getTime() <= this.selectStartDate.getTime()) {
            let seD = this.selectEndDate.getTime() - 24 * 3600 * 1000;
            this.selectStartDate = new Date(seD);
          }
          this.$store.commit('set_checkIn', this.selectStartDate);
          this.$store.commit('set_checkOut', this.selectEndDate);
          this.$emit('done', this.selectEndDate, true, this.selectStartDate);
        }


      },
      //上月
      prev() {
        let cd, cYear, cMonth, cDay;
        if (this.targetStatus == 'START') {
          cd = this.currentStartDate;

          if (this.currentStartInitDay.getTime() > this.currentLimitInitDay.getTime()) {
            cYear = cd.getFullYear();
            cMonth = cd.getMonth() - 1;
            cDay = cd.getDate();
            if (cMonth > 12) {
              cYear--;
            }
            this.currentStartDate = new Date(cYear, cMonth, cDay);
          } else {
          }

        } else if (this.targetStatus == 'END') {
          cd = this.currentEndDate;

          if (this.currentEndInitDay.getTime() > this.currentLimitInitDay.getTime()) {
            cYear = cd.getFullYear();
            cMonth = cd.getMonth() - 1;
            cDay = cd.getDate();
            if (cMonth > 12) {
              cYear--;
            }
            this.currentEndDate = new Date(cYear, cMonth, cDay);
          } else {
          }
        }

      },
      //下月
      next() {
        let cd, cYear, cMonth, cDay;
        if (this.targetStatus == 'START') {
          cd = this.currentStartDate;
          if (this.currentStartInitDay.getTime() < this.currentLimitMaxInitDay.getTime()) {
            cYear = cd.getFullYear();
            cMonth = cd.getMonth() + 1;
            cDay = cd.getDate();
            if (cMonth > 12) {
              cYear++;
              cMonth -= 12;
            }
            this.currentStartDate = new Date(cYear, cMonth, cDay);
          } else {
          }
        } else if (this.targetStatus == 'END') {
          cd = this.currentEndDate;
          if (this.currentEndInitDay.getTime() < this.currentLimitMaxInitDay.getTime()) {
            cYear = cd.getFullYear();
            cMonth = cd.getMonth() + 1;
            cDay = cd.getDate();
            if (cMonth > 12) {
              cYear++;
              cMonth -= 12;
            }
            this.currentEndDate = new Date(cYear, cMonth, cDay);
          } else {
          }
        }

      },


    }
  }
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .flex-row-nowrap {
    display: flex;
    flex-flow: row nowrap;
  }

  .flex-row-wrap {
    display: flex;
    flex-flow: row wrap;
  }

  .syj-date {
    position: absolute;
    width: 100%;
    .s-date {
      width: 100%;
      &-action {
        height: 34.75px;
        line-height: 34.75px;
        .btn {
          width: 14.2857%;
          button {
            width: 100%;
            height: 100%;
            border: 0;
            color: #0b9d78;
            line-height: 32px;
            font-family: SimHei;
            font-size: 20px;
            background-color: #fff;
            &.disabled {
              color: rgb(204, 204, 204);
            }
          }
        }
        &-current-date {
          flex-grow: 2;
          text-align: center;
        }
      }
      &-week {
        background-color: #f5f5f5;
        &-item {
          font-family: 'Roboto', 'Noto', 'Helvetica', 'Arial', sans-serif;
          flex-grow: 1;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          color: rgb(158, 158, 158);
          text-align: center;
        }
      }
      &-day {
        border: 1px solid #ddd;
        border-top: 0;
        &-item {
          width: 14.27%;
          height: 33px;
          line-height: 33px;
          border-radius: 2px;
          font-family: 'Roboto', 'Noto', 'Helvetica', 'Arial', sans-serif;
          color: rgb(33, 33, 33);
          font-weight: 500;
          text-align: center;
          &.selected {
            background-color: #0b9d78;
            color: #fff;
          }
          &.disabled {
            color: rgb(157, 157, 157);
          }
        }
      }
    }
  }
</style>
