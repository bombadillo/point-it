<template>
    <div
        :class="calculateClass()"
        :style="calculatePointCardPositioning(cardKey)"
        @click="onClick()"
    ></div>
</template>

<script>
export default {
    props: ['point', 'cardKey', 'pointIt', 'selectedPoint', 'animate'],
    methods: {
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
        calculateClass() {
            let className = `point-card rounded point-card-${this.point}`;

            className += this.point ? ' cursor-pointer' : '';

            if (this.animate)
                className += this.selectedPoint === this.point ? ' point-card-selected' : ' point-card-animate';

            return className;
        },
        onClick() {
            if(this.point)
            {
                this.pointIt(this.point)
            }
        }
    }
}
</script>

<style scoped>
.point-card {
    width: 73px;
    height: 111px;
    background-image: url(~@/jira/grooming-tickets/images/points-cards.png);
    background-size: 550px;
    transform: scale(1);
}

.point-card-animate {
    transition: transform ease-in 0.15s;
    transform: margin-top 0.6s ease-in-out, transform 0.6s ease-in-out;
}

.point-card-animate:hover {
    transform: translateY(-16px);
}

.point-card-selected {
    margin-top: -16px;
}
</style>
