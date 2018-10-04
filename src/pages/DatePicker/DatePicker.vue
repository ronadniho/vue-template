<template>
  <div id="date-picker">
   <!-- <div class="check">
      <div class="check-in">
        <input
          type="text"
          readonly
          @click="active('START')"
          :class="{active:isActive&&targetStatus=='START'}"
          :value="checkIn"
        >
      </div>
      <div class="check-out">
        <input
          type="text"
          readonly
          @click="active('END')"
          :class="{active:isActive&&targetStatus=='END'}"
          :value="checkOut"
        >
      </div>
    </div>-->

    <div class="datepicker form-group">
      <div class="checkIn">
        <label>Check-In</label>
        <input
          type="text"
          readonly
          @click="active('START')"
          :class="{active:isActive&&targetStatus=='START'}"
          :value="checkIn"
        >
      </div>
      <div class="checkOut">
        <label>Check-Out</label>
        <input
          type="text"
          readonly
          @click="active('END')"
          :class="{active:isActive&&targetStatus=='END'}"
          :value="checkOut"
        >
      </div>
    </div>


    <syj-date
      :limit="limit"
      :isActive="isActive"
      :targetStatus="targetStatus"
      @done="done"
    ></syj-date>
  </div>
</template>

<script>
  import syjDate from './component/syjDate'

  export default {
    name: "DatePicker",
    components: {syjDate},
    data() {
      return {
        checkIn: new Date(new Date().getTime() + 24 * 3600 * 1000),
        checkOut: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2),
        limit: {
          min: new Date(),
          max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
        isActive: false,
        targetStatus: 'START',
      }
    },
    created: function () {
      this.checkIn = this.$store.state.search.checkIn;
      this.checkOut = this.$store.state.search.checkOut;
    },
    methods: {
      active(val) {
        if (val == this.targetStatus && this.isActive) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
        this.targetStatus = val;
      },
      done(val1, bool, val2) {
        if (bool) {
          this.checkOut = val1;
          this.checkIn = val2;
          this.isActive = false;
        } else {
          this.checkIn = val1;
          this.checkOut = val2;
          this.targetStatus = 'END';
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.6rem;
    label {
      font-size: 0.48rem;
      text-align: left;
      line-height: 0.64rem;
      margin-bottom: 0.2rem;
      width: 100%;
    }
    input {
      border: 1px solid #CECFD0;
      border-radius: 2px;
      padding: 0 0.2rem;
      height: 1.8rem;
      width: 100%;
      &.active {
        border-color: #0B9D78;
      }
    }
    &.datepicker {
      flex-direction: row;
      justify-content: space-between;
      input {
        background: url("../../assets/images/icon-calendar-normal.png") no-repeat center right 0.2rem/0.68rem 0.68rem;
        font-size: 0.56rem;
      }
      div {
        width: 45%;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      i {
        position: absolute;
        width: 0.68rem;
        height: 0.68rem;
        background: url("../../assets/images/icon-calendar-normal.png") no-repeat center/contain;
        right: 0.2rem;
        top: 1.4rem
      }
    }
  }


 /* #date-picker {
    position: relative;
    width: 100%;
    .check {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      &-in {
        flex-grow: 1;
      }
      &-out {
        flex-grow: 1;
      }
    }
    input {
      width: 100%;
      height: 30px;
      padding: 0 20px;
      border: 1px solid #ddd;
      border-radius: 3px;
      box-sizing: border-box;
      background-color: #fff;
      &.active {
        background-color: #ddd;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }*/
</style>
