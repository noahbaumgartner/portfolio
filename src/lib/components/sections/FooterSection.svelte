<script lang="ts">
	import { Footer, FooterColumn, Link } from '@noahbaumgartner/svelte-ui';
</script>

<div class="footer-wrapper page-padding section-gap">
	<Footer title="Danke fürs\nVorbeischauen." copyright="Noah Baumgartner">
		<FooterColumn heading="Weiteres">
			<Link href="/imprint">Impressum</Link>
		</FooterColumn>
		<FooterColumn heading="Social Media">
			<Link href="https://www.instagram.com/noahbaumgartner/">Instagram</Link>
			<Link href="https://www.linkedin.com/in/noahbaumgartner/">LinkedIn</Link>
		</FooterColumn>
	</Footer>
</div>

<style>
	.footer-wrapper {
		/* The page sets the gap above the footer with its own bottom margin; as a
		   flex item of <body> the footer's margin would add to it, not collapse. */
		margin-block: 0;
		padding-bottom: 20px;
	}

	.footer-wrapper > :global(.footer) {
		margin-inline: auto;
		max-width: 1280px;
	}
</style>
