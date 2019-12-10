package com.company.flight.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.company.flight.model.FlightDetail;
import com.company.flight.service.FlightServiceImpl;

@RestController
public class FlightDetailController {

	@Autowired
	FlightServiceImpl flightService;

	// @CrossOrigin is used to handle the request from a difference origin.
	@CrossOrigin(origins = "http://localhost:4202")
	@RequestMapping(value = "/flights", method = RequestMethod.GET)
	public List<FlightDetail> getAllFlights() {
		return flightService.getAllFlights();
	}
}