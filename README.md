# scrollnums
JS library for scrolling numbers

### markup
```
<section id="stats">
	<div class="section">
		<div class="jv-wrapper">
			<h2>Header</h2>
			<ul class="list-unstyled flex-col flex-center flex-wrap flex-row-md flex-m-space-around-md flex-c-start-md">
				<li class="stat flex-auto flex-col flex-center flex-nowrap" tabindex="0">
					<span aria-label="50+ - Years Industry Presence"></span>
					<span aria-hidden="true">
						<h1 class="flex-row flex-center">
							<span class="counting" data-count="50">50</span>
							<span>&plus;</span>
						</h1>
						<p>Years Industry <br>Presence</p>
					</span>
				</li>
				<li class="stat flex-auto flex-col flex-center flex-nowrap" tabindex="0">
					<span aria-label="16 - Offices Worldwide"></span>
					<span aria-hidden="true">
						<h1 class="flex-center">
							<span class="counting" data-count="16">16</span>
						</h1>
						<p>Offices <br>Worldwide</p>
					</span>
				</li>
				<li class="stat flex-auto flex-col flex-center flex-nowrap" tabindex="0">
					<span aria-label="2000+ - Global Staff"></span>
					<span aria-hidden="true">
						<h1 class="flex-row flex-center">
							<span class="counting" data-count="2000">2000</span>
							<span>&plus;</span>
						</h1>
						<p>Global Colleagues</p>
					</span>
				</li>
				<li class="stat flex-auto flex-col flex-center flex-nowrap" tabindex="0">
					<span aria-label="69 - Nationalities"></span>
					<span aria-hidden="true">
						<h1 class="flex-center">
							<span class="counting" data-count="69">69</span>
						</h1>
						<p>Nationalities</p>
					</span>
				</li>
			</ul>
		</div>
	</div>
</section>
```

### js
```
<script>
	window.addEventListener('load', function() {
		var counter = new CountNums([
			{
				container: '#stats',
				selector: '.counting'
			}
			// ,
			// {
			// 	container: '#stats2',
			// 	delay: 10,
			// 	time: 2000,
			// 	onlyOnce: true
			// },
			// {
			// 	container: '#stats3',
			// 	delay: 10,
			// 	time: 2000,
			// 	direction: 'down'
			// }
		]);
	});
</script>
```