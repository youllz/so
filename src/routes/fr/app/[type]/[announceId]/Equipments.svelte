<script lang="ts">


  export let equipments: string[] = []
</script>


{#if equipments.length !== 0}
  <div>
    
  </div>

  {:else}
    <div class="bg-accent text-accent-foreground">
      <p>
        Aucun équipement disponible
      </p>
    </div>
{/if}