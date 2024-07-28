<script lang="ts">
	import { getRandom } from "@repo/utils/number";
	import { onMount } from "svelte";

    type Props = {
        title: string;
        progress: number
    }

    let { title, progress = $bindable(0) }: Props = $props();

    const startAnim = () => {
        const step = .1;

        const interval = setInterval(() => {
            if(progress > 100) clearInterval(interval);
            if(step + progress > 100) progress = 100;
            else progress += step;
        }, 5);
    }

    onMount(() => {
        setTimeout(() => { startAnim() }, getRandom(50, 1050));
    })
</script>

<div class="checker">
    <p>{title}</p>
    <div class="checker-progress" style:--progress={`${progress}%`}></div>
</div>

<style lang="scss">
    .checker {
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 5px;
        p {
            font-size: 18px;
            font-weight: 400;
        }
        &-progress {
            position: relative;
            width: 100%; height: 20px;
            background-color: rgba(#100F41, .8);
            border-radius: 4px;
            clip-path: polygon(0% 5%, 100% 0%, 95% 100%, 0% 100%);
            overflow: hidden;

            &::after {
                content: '';
                
                position: absolute;
                top: 4px; left: 4px;
                width: calc(var(--progress) - 10px); height: calc(100% - 8px);
                background-color: #0FA4F9;
                clip-path: polygon(0% 5%, 100% 0%, 96% 100%, 0% 100%);
                // transition: all .1s linear;
            }
        }
    }
</style>