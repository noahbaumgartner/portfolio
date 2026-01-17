<script>
	import ComponentName from "./ComponentName.svelte";
	import Section from "./Section.svelte";

	const experiences = [
		{
			period: "Juli 2023 - Heute",
			title: "Fullstack Software Entwickler",
			company: "B3 Digital AG",
			description: "Bei B3 Digital AG bin ich als Fullstack Software Entwickler tätig, wo ich vor allem an der Web-Applikation buildagil arbeite."
		},
        {
            period: "Mai 2023 - Juli 2023",
            title: "SAP PI Consultant",
            company: "Swisscom",
            description: "Als SAP PI Consultant bei Swisscom sammelte ich wertvolle Erfahrungen in der Integration von SAP-Systemen, bevor ich mich für eine neue berufliche Herausforderung entschied."
		},
		{
			period: "August 2016 - April 2023",
			title: "Software Entwickler",
			company: "SFS Group",
            description: "Während meiner Lehre bei der SFS Group konzentrierte ich mich auf Java- und Webentwicklung. Nach erfolgreichem Abschluss spezialisierte ich mich auf SAP-Entwicklung mit ABAP und SAP Fiori."
		}
	];
</script>

<Section sectionNumber="02">
    <ComponentName name="AboutWorkExperience.svelte" position="bottom-left" />
    <div class="flex w-full h-full flex-col lg:flex-row">
        <div class="bg-grid px-10 py-10 border-b lg:border-b-0 lg:border-r border-neutral-300 flex items-center justify-center">
            <h2 class="lg:[writing-mode:sideways-lr]">Berufserfahrung</h2>
        </div>
        <div class="grow flex flex-col">
            {#each experiences as experience}
                <div class="p-10 flex flex-col space-y-2 border-b border-neutral-300">
                    <div>
                        <span class="text-xs font-[Source_Code_Pro] bg-black text-white px-2 py-0.5">
                            {experience.period}
                        </span>
                    </div>
                    <div class="flex space-x-2">
                        <h2 class="text-2xl font-semibold mb-2">{experience.title}</h2>
                        <span class="text-neutral-500 text-sm leading-8">/{experience.company}/</span>
                    </div>
                    <p class="max-w-2xl">{experience.description}</p>
                </div>
            {/each}
        </div>
    </div>
</Section>