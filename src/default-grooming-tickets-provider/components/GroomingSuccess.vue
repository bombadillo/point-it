<template>
    <div class="flex flex-col items-center">
        <img
            src="https://media.giphy.com/media/11ISwbgCxEzMyY/giphy.gif"
            alt="Ticket groomed"
            class="rounded mt-4 drop-shadow"
        />
        <h3 class="text-xl font-bold text-center">Ticket groomed!</h3>
        <button
            class="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        v-on:click="onPointNextTicketClicked"
        >
            Point next ticket
        </button>
    </div>
</template>

<script>
export default {
    props: ['points', 'onPointNextTicketClicked'],
    setup() {}
}
</script>
