
 <script>
   import { onMount, afterUpdate } from "svelte";

let currentDate = new Date();
let selectedDate = null;
let daysInMonth = [];
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let formattedDate = "";

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

onMount(() => {
  generateCalendar();
  updateFormattedDate();
});

afterUpdate(() => {
  updateFormattedDate();
});

function updateFormattedDate() {
  formattedDate = new Intl.DateTimeFormat("default", { month: "long", year: "numeric" }).format(currentDate);
}

function isCurrentDate(date) {
  const today = new Date();
  return currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() && date === today.getDate();
}
</script>

<div class="calendar">
  <div class="calendar-header">
    <a class="calendar-btn" on:click={prevMonth}>
      <i>arrow_back</i>
    </a>
    <h4 class="calendar-title">{formattedDate}</h4>
    <a class="calendar-btn" on:click={nextMonth}>
      <i>arrow_forward</i>
    </a>
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
          <span></span>
        {:else}
          <span class="calendar-date {isCurrentDate(day) && 'primary'}" class:selected={day === selectedDate} on:click={() => selectDate(day)}>{day}</span>
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
    text-align: center;
    margin: 0 auto;
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
