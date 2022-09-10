<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    
    export default defineComponent({
        name: 'HomeCard',
    
        components: {},
    
        props: {
            count:{
                type: Number
            },
            text: {
                type: String
            }
        },
    
        setup(_props) {
        },
    })
</script>
    
    <template>
        <div class="p-[1.75rem] w-[14.8rem] bg-[#FFFFFF] rounded-[8px] shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)]">
            <p class="text-[#111827] text-[1.75rem] leading-[2.25rem] font-semibold mb-[4px]">{{count}}</p>
            <p class="text-[#6B7280] text-[1rem] leading-[1.4rem] font-normal mb-[16px]">{{text}}</p>
            <button class="w-[100%] h-[2.4rem] border-[1px] border-[#D1D5DB] text-[#D1D5DB] text-[1rem] leading-[1.4rem] rounded-[6px]">View all</button>
        </div>
    </template>
    
    <!-- h-[10.5rem] -->