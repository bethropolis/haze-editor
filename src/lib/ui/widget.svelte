<script>
  import { onMount } from "svelte";

  let currentDate = new Date();
  let selectedDate = null;
  let daysInMonth = [];
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    daysInMonth = Array.from({ length: lastDate }, (_, i) => i + 1);
    daysInMonth = Array(firstDay).fill(null).concat(daysInMonth);
  }

  function selectDate(date) {
    selectedDate = date;
  }

  function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
  }

  function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
  }

  onMount(generateCalendar);
</script>

<div class="calendar">
  <div class="calendar-header">
    <button class="calendar-btn" on:click={prevMonth}>
      <i>arrow_back</i>
    </button>
    <h2 class="calendar-title">
      {new Intl.DateTimeFormat("default", {
        month: "long",
        year: "numeric",
      }).format(currentDate)}
    </h2>
    <button class="calendar-btn" on:click={nextMonth}>
      <i>arrow_forward</i>
    </button>
  </div>
  <div class="calendar-body">
    <div class="calendar-weekdays">
      {#each weekdays as weekday}
        <span class="calendar-weekday">{weekday}</span>
      {/each}
    </div>
    <div class="calendar-dates">
      {#each daysInMonth as day}
        {#if day === null}
          <span />
        {:else}
          <span
            class="calendar-date text-white {currentDate.getDate() === day &&
              'primary'}"
            class:selected={day === selectedDate}
            on:click={() => selectDate(day)}>{day}</span
          >
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .calendar {
    height: 400px;
    width: 100%;
    font-family: Arial, sans-serif;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .calendar-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--secondary);
  }

  .calendar-title {
    margin: 0;
  }

  .calendar-body {
    padding: 10px;
  }

  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 10px;
  }

  .calendar-weekday {
    text-align: center;
    color: var(--secondary);
  }

  .calendar-dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
  }

  .calendar-date {
    text-align: center;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    color: var(--secondary);
  }

  .calendar-date.current-date {
    background-color: var(--active);
    color: var(--primary);
  }

  .calendar-date:hover {
    background-color: var(--primary) !important;
    color: var(--on-primary);
  }

  @media (max-width: 600px) {
    .calendar {
      width: 100%;
    }
  }
</style>
