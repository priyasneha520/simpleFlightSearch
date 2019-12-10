package com.company.flight.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.company.flight.model.FlightDetail;
import com.github.javafaker.Faker;

@Repository
public class FlightDetailDaoImpl {

	// Method to generate the dummy flight records.
	public List<FlightDetail> getAllFlightsFromDb() {

		// To generate the fake details for the flights.
		Faker faker = new Faker();

		List<FlightDetail> flights = new ArrayList<FlightDetail>();

		// Creating fake list to be shown on the angular html page.
		for (int i = 101; i <= 150; i++) {

			FlightDetail flight = new FlightDetail();
			flight.setFlightNumber(i);
			flight.setAircraft(faker.book().publisher());
			flight.setArrival(faker.date().birthday());
			flight.setCarrier(faker.artist().name());
			flight.setDeparture(faker.date().birthday());
			flight.setDestination(faker.address().city());
			flight.setDistance(faker.number().numberBetween(0l, 1000l));
			flight.setOrigin(faker.address().city());
			flight.setTravelTime(faker.number().numberBetween(0, 500));
			flight.setStatus(faker.lorem().word());

			flights.add(flight);
		}

		return flights;
	}
}