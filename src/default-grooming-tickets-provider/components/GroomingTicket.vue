<template>
    <div class="p-10 overflow-auto h-screen">
        <div
            v-if="!ticket && !session.groomingSuccessful"
            class="flex flex-col items-center"
        >
            <img
                src="https://64.media.tumblr.com/tumblr_ljkn5yjPkO1qixleeo1_400.gifv"
                alt="No ticket selected"
                class="rounded mt-4 drop-shadow"
            />
            <h3 class="text-xl font-bold text-center">
                Waiting on a ticket...
            </h3>
        </div>

        <div
            v-if="ticket"
            id="main"
            class="p-5 bg-white rounded border-black-800 drop-shadow-2xl"
        >
            <div class="">
                <div class="">
                    <h1
                        class="text-xl font-bold text-indigo-600 hover:text-indigo-500"
                    >
                        Ticket
                    </h1>
                </div>

                <div class="pt-5">
                    <label class="font-bold">Choose your points</label>
                    <div class="flex flex-wrap">
                        <GroomingCard
                            v-for="(point, index) in pointOptions"
                            :key="index"
                            :point="point"
                            :cardKey="index"
                            :pointIt="pointIt"
                            :selectedPoint="selectedPoint"
                        />
                        <!-- <div
              v-for="(point, index) in pointOptions"
              :key="index"
              :class="`point-card rounded point-card-${point} cursor-pointer point-card-animate`"
              :style="calculatePointCardPositioning(index)"
              @click="pointIt(point)"
            ></div> -->
                    </div>
                </div>

                <div class="flex flex-col pt-5">
                    <h1
                        v-if="!repointRequired"
                        class="text-xl font-bold text-gray-500"
                    >
                        Not pointed
                    </h1>
                    <ul>
                        <li
                            v-for="user in usersYetToPoint()"
                            :key="user.name"
                            class="font-semibold"
                        >
                            {{ user.name }}
                        </li>
                    </ul>

                    <h1 class="text-xl font-bold text-indigo-500 pt-3">
                        Pointed
                    </h1>

                    <div class="flex flex-wrap">
                        <div
                            v-for="user in usersPointed()"
                            :key="user.name"
                            class="font-semibold mr-2 text-center"
                        >
                            {{ user.name }}

                            <div
                                v-if="!this.session.revealPoints"
                                class="hidden-points-card max-w-sm rounded overflow-hidden shadow-lg p-6 text-4xl bg-blue-200 border-4 border-blue-300"
                            >
                                ?
                            </div>

                            <GroomingCard
                                v-if="this.session.revealPoints"
                                :cardKey="pointOptions.indexOf(user.points)"
                            />

                            <!-- <div
                v-if="repointRequired"
                :class="`point-card rounded point-card-${user.points}`"
                :style="
                  calculatePointCardPositioning(
                    pointOptions.indexOf(user.points)
                  )
                "
              ></div> -->
                        </div>
                    </div>
                    <div v-if="session.allUsersPointed" class="mt-4">
                        <button
                            v-if="!this.session.revealPoints"
                            class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click="revealPoints()"
                        >
                            Reveal points
                        </button>
                    </div>
                    <h2 v-if="!usersPointed().length">
                        Patiently waiting for points
                    </h2>
                </div>

                <GroomingSuccess
                    v-if="session.revealPoints"
                    :points="points"
                    :onPointNextTicketClicked="pointNextTicket"
                />

                <h2
                    v-if="repointRequired"
                    class="text-xl font-normal text-red-700 pt-3"
                >
                    User pointing is not unanimous. Repoint!
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
import GroomingSuccess from '@/default-grooming-tickets-provider/components/GroomingSuccess'
import addPointsToActiveTicket from '@/session/services/add-points-to-active-ticket'
import groomNextTicket from '@/session/services/groom-next-ticket'
import revealPointsService from '@/session/services/reveal-points'
import GroomingCard from '@/card/components/GroomingCard'

export default {
    props: ['session', 'user'],

    components: {
        GroomingSuccess,
        GroomingCard
    },
    data() {
        return {
            ticket: true,
            points: 1,
            pointOptions: [1, 2, 3, 5, 8, 13, 20, 40],
            selectedPoint: null
        }
    },
    methods: {
        pointIt(points) {
            this.points = points
            this.pointSubmitted(this.points)
        },
        usersPointed() {
            return this.session.users.filter((user) => {
                return user.points
            })
        },
        usersYetToPoint() {
            return this.session.users.filter((user) => {
                return !user.points
            })
        },
        calculatePointCardPositioning(cardNumber) {
            const isSecondRow = cardNumber < 5
            const rightPositioningMultiplier = isSecondRow
                ? cardNumber
                : cardNumber - 5
            const baseLine = isSecondRow ? 166 : 15
            const increase = 75
            const rightPositioning =
                rightPositioningMultiplier * increase + baseLine
            const topPositioning = isSecondRow ? 164 : 278

            return {
                backgroundPosition: `-${rightPositioning}px -${topPositioning}px`
            }
        },
        pointSubmitted(points) {
            this.selectedPoint = points
            addPointsToActiveTicket(
                this.session.name,
                this.user,
                points,
                this.session.activeTicketId
            )
        },

        pointNextTicket() {
            groomNextTicket(this.session?.name)
            this.ticket = true
        },

        revealPoints() {
            revealPointsService(this.session?.name)
        }
    }
}
</script>

<style scoped>
.form {
    margin-bottom: 20px;
}

.points-label {
    font-weight: bold;
    margin-right: 10px;
}

.points {
    display: inline-block;
    margin-left: 10px;
}

.message {
    padding: 10px;
    background-color: #1f8dd6;
    color: white;
    font-size: 1.125em;
    text-align: center;
}

.hidden-points-card {
    width: 73px;
    height: 111px;
    margin: 0 auto;
}
</style>
