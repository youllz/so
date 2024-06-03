<script lang="ts">
  import Sun from "svelte-radix/Sun.svelte";
  import Moon from "svelte-radix/Moon.svelte";
 
  import { resetMode, setMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>
 
<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="ghost" size="icon">
      <Sun
        class=" size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute  size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Changer de theme</span>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item on:click={() => setMode("light")}
      >claire</DropdownMenu.Item
    >
    <DropdownMenu.Item on:click={() => setMode("dark")}>Sombre</DropdownMenu.Item>
    <DropdownMenu.Item on:click={() => resetMode()}>Systeme</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>