<script lang="ts">
  export let label: string
  export let value: string
</script>



<div class="d-box"> 
  <span>
    <slot><!-- optional fallback --></slot>
  </span>
  <div class="grid gap-1">
    <p class="d-label">{label}</p>
    <p class="d-value">{value}</p>
  </div>
</div>


<style lang="postcss">



.d-box {
	@apply flex items-center gap-6  
}


.d-label {
	@apply text-sm text-muted-foreground
}


</style>